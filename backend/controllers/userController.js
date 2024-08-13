const Users = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { sendEmail } = require("../middleware/sendMail");
const crypto = require('crypto');
const { check, validationResult } = require('express-validator');
const xss = require("xss");

const PASSWORD_EXPIRY_TIME = 5 * 60 * 1000; // 1 minute for testing purposes
const MAX_FAILED_ATTEMPTS = 3;
const LOCK_TIME = 5 * 60 * 1000; // 5 minutes

const isPasswordInHistory = async (user, newPassword) => {
  // Ensure passwordHistory is initialized as an array
  if (!user.passwordHistory) {
    user.passwordHistory = [];
  }

  for (let oldPasswordHash of user.passwordHistory) {
      const isMatch = await bcrypt.compare(newPassword, oldPasswordHash);
      if (isMatch) {
          return true;
      }
  }
  return false;
};

const hasPasswordExpired = (user) => {
  if (!user.passwordChangedAt) return false;
  const now = Date.now();
  const passwordChangedTime = new Date(user.passwordChangedAt).getTime();
  return now - passwordChangedTime > PASSWORD_EXPIRY_TIME;
};

const isAccountLocked = (user) => {
  if (!user.lockUntil) return false;
  return Date.now() < new Date(user.lockUntil).getTime();
};

// Function to send verification email
const sendVerifyMail = async (firstName, email, user_id) => {
  try {
      const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          requireTLS: true,
          auth: {
              user: "amiableella6@gmail.com",
              pass: "haik cshy czot pmkd",
          },
      });
      const mailOptions = {
          from: "amiableella6@gmail.com",
          to: email,
          subject: "For Verification mail",
          html: `<p>Hi, ${firstName} ,Please click here to <a href= "http://localhost:5000/api/user/verify/${user_id}"> Verify </a> your mail.</p>`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
              console.log(error);
          } else {
              console.log("Email has been successfully sent:-", info.response);
          }
      });
  } catch (error) {
      console.error("Error sending verification mail:", error);
      throw new Error("Email sending failed");
  }
};

// Middleware to sanitize and validate incoming data
const createUser = [
    // Password validation
    check('password')
        .isLength({ min: 8, max: 12 }).withMessage('Password must be 8-12 characters long.')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter.')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter.')
        .matches(/\d/).withMessage('Password must contain at least one number.')
        .matches(/[\W_]/).withMessage('Password must contain at least one special character.'),
    
    async (req, res) => {
        // step 1 : Check if data is coming or not
        console.log(req.body);

        // Step 2: Destructure the data
        const { firstName, lastName, email, password } = req.body;

        // Step 3: Validate incoming data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        // Step 4: Try-catch block
        try {
            // Step 5: Check existing user
            const existingUser = await Users.findOne({ email: email });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "User already exists."
                });
            }

            // Password encryption
            const randomSalt = await bcrypt.genSalt(10);
            const encryptedPassword = await bcrypt.hash(password, randomSalt);

            // Step 6: Create new user
            const newUser = new Users({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: encryptedPassword,
                passwordChangedAt: Date.now(), // Set password change time to now
                passwordHistory: [encryptedPassword] // Initialize password history with the current password
            });

            // Step 7: Save user and response
            await newUser.save();
            sendVerifyMail(firstName, email, newUser._id);

            res.status(200).json({
                success: true,
                message: "User created successfully. Please verify your mail."
            });

        } catch (error) {
            console.error("Error creating user:", error.message);
            res.status(500).json({
                success: false,
                message: "Server Error",
            });
        }
    }
];

const verifyMail = async (req, res) => {
    try {
        console.log("Verify Mail Request Params:", req.params); // Check the request parameters
        const updateInfo = await Users.updateOne(
            {
                _id: req.params.id,
            },
            {
                $set: { is_verified: 1 },
            }
        );
        console.log("Update Info:", updateInfo); // Check the update info
        res.status(200).json({
            success: true,
        });
    } catch (error) {
        console.error("Verify Mail Error:", error); // Check the error message
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const loginUser = async (req, res) => {
    // Step 1 : Check if data is coming or not
    console.log(req.body);

    // Step 2: Destructure the data
    const { email, password } = req.body;

    // Step 3: Validate the incoming data
    if (!email || !password) {
        return res.json({
            success: false,
            message: "Please fill all the fields."
        });
    }

    // Step 4: Try-catch block
    try {
        // Step 5: Find user
        const user = await Users.findOne({ email: email });
        if (!user) {
            return res.json({
                success: false,
                message: "User does not exist."
            });
        }

        if (user.is_verified === 0) {
            return res.status(500).json({
                success: false,
                message: "Please verify your email first.",
            });
        }

         // Check if the password has expired
         if (hasPasswordExpired(user)) {
            console.log("Password has expired for user:", email);
        
            const resetToken = user.resetToken; // Use the existing reset token from the user model
        
            return res.status(403).json({
                success: false,
                message: "Your password has expired, set a new password.",
                resetToken: resetToken // Send the reset token to the frontend
            });
        }
        if (isAccountLocked(user)) {
            console.log("Account is locked for user for 5 mins due to multiple failed attempts:", email);
            return res.json({
              success: false,
              message: "Your account is locked due to multiple failed login attempts. Please try again after 5 minutes."
            });
          }

        // Step 6: Check password
        const passwordToCompare = user.password;
        const isMatch = await bcrypt.compare(password, passwordToCompare);
        if (!isMatch) {
            user.failedLoginAttempts += 1;
      if (user.failedLoginAttempts >= MAX_FAILED_ATTEMPTS) {
        user.lockUntil = Date.now() + LOCK_TIME;
        await user.save();
        return res.json({
          success: false,
          message: "3 failed login attempts, your account has been locked for 5 mins."
        });
      } else {
        let attemptsLeft = MAX_FAILED_ATTEMPTS - user.failedLoginAttempts;
        let errorMessage = `Incorrect Password. You have ${attemptsLeft} ${attemptsLeft > 1 ? 'attempts' : 'attempt'} left before your account is locked.`;
        await user.save();
        return res.json({
          success: false,
          message: errorMessage
        });
      }
    }

    // If password matches
    user.failedLoginAttempts = 0; // Reset failed attempts on successful login
    user.lockUntil = null; // Unlock the account
    await user.save();

    // Step 7: Create token
    const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_TOKEN_SECRET,
    );

    // Step 8: Send Response
    res.status(200).json({
        success: true,
        token: token,
        userData: user,
        message: "User logged in successfully."
    });

    } catch (error) {
        console.log(error);
        res.json(error);
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }

        // Retrieve existing user details
        const existingUserDetails = {
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNo: user.phoneNo,
            avatar: user.avatar,
        };

        let avatarUrl = null;
        if (req.files && req.files.avatar) {
            // If avatar file is uploaded
            const { avatar } = req.files;
            const uploadedAvatar = await cloudinary.uploader.upload(avatar.path, { folder: 'avatars' });
            if (!uploadedAvatar || !uploadedAvatar.secure_url) {
                return res.status(500).json({
                    success: false,
                    message: 'Failed to upload avatar to Cloudinary',
                });
            }
            avatarUrl = uploadedAvatar.secure_url;
        } else if (typeof req.body.avatar === 'string') {
            // If avatar URL is provided in the request body
            avatarUrl = req.body.avatar;
        }

        // Update user profile with new data
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.phoneNo = req.body.email || user.email;
        user.avatar = avatarUrl || user.avatar;

        // Save the updated user profile
        await user.save();

        // Send response with existing user details
        res.status(200).json({
            success: true,
            message: 'User profile updated successfully.',
            user: existingUserDetails,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Step 1: Validate input
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required.",
            });
        }

        // Step 2: Find user by email
        const user = await Users.findOne({ email });

        // Step 3: Handle user not found
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Email not found.",
            });
        }

        // Step 4: Check if user is verified
        if (user.is_verified === 0) {
            return res.status(403).json({
                success: false,
                message: "Please verify your email first.",
            });
        }

        // Step 5: Generate reset token and expire time
        const resetPasswordToken = user.getResetPasswordToken();
        await user.save();

        // Step 6: Send reset password email
        const frontendBaseUrl = process.env.FRONTEND_BASE_URL || "http://localhost:3000";
        const resetUrl = `${frontendBaseUrl}/password/reset/${resetPasswordToken}`;
        const message = `Reset Your Password by clicking on the link below: \n\n ${resetUrl}`;

        try {
            await sendEmail({
                email: user.email,
                subject: "Reset Password",
                message,
            });

            res.status(200).json({
                success: true,
                message: `Email sent to ${user.email}`,
            });
        } catch (error) {
            // Error sending email
            console.error("Error sending email:", error);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();

            res.status(500).json({
                success: false,
                message: "Failed to send reset email.",
            });
        }
    } catch (error) {
        // Generic server error
        console.error("Forgot password error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");

        console.log("Reset Password Token:", resetPasswordToken);

        const user = await Users.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid or has expired",
            });
        }

        // Check if the new password is in history
        const isInHistory = await isPasswordInHistory(user, req.body.password);
        console.log("Is password in history:", isInHistory);

        if (isInHistory) {
          return res.status(400).json({
              success: false,
              message: "New password must not match any of the previous passwords.",
          });
        }

        // Reset password logic with XSS protection
        const newPassword = await bcrypt.hash(xss(req.body.password), 10);
        user.passwordHistory.push(user.password); // Add the current password to history before updating
        if (user.passwordHistory.length > 5) {
            user.passwordHistory.shift(); // Keep only the last 5 passwords in history
        }
        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        user.passwordChangedAt = Date.now(); // Update the password change timestamp
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password Updated",
        });
    } catch (error) {
        console.error("Reset Password Error:", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

module.exports = {
 createUser,
  loginUser,
  verifyMail,
  updateUserProfile,
  forgotPassword,
  resetPassword
};

const Users = require("../model/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer");
const {sendEmail} = require("../middleware/sendMail");



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
        from: "amiablella6@gmail.com",
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
      // console.log(error.message);
      console.error("Error sending verification mail:", error);
      throw new Error("Email sending failed");
    }
  };


const createUser = async (req, res) => {
    // step 1 : Check if data is coming or not
    console.log(req.body);

    // step 2 : Destructure the data
    const { firstName, lastName, email, password } = req.body;

    // step 3 : validate the incomming data
    if (!firstName || !lastName || !email || !password) {
        return res.json({
            success: false,
            message: "Please fill all the fields."
        })
    }

    // step 4 : try catch block
    try {
        // step 5 : Check existing user
        const existingUser = await Users.findOne({ email: email })
        if (existingUser) {
            return res.json({
                success: false,
                message: "User already exists."
            })
        }

        // password encryption
        const randomSalt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, randomSalt)

        // step 6 : create new user
        const newUser = new Users({
            // fieldname : incomming data name
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: encryptedPassword,
        })

        // step 7 : save user and response
        await newUser.save();
        sendVerifyMail(firstName, email, newUser._id); 

        res.status(200).json({
            success: true,
            message: "User created successfully.Please verify your mail."
        });

    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).json({
          success: false,
          message: "Server Error",
        });
    }


}


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

    // step 2 : Destructure the data
    const {email, password} = req.body;

    // step 3 : validate the incomming data
    if(!email || !password){
        return res.json({
            success : false,
            message : "Please fill all the fields."
        })
    }

    // step 4 : try catch block
    try {
        // step 5 : Find user
        const user = await Users.findOne({email : email}) // user store all the data of user
        if(!user){
            return res.json({
                success : false,
                message : "User does not exists."
            })
        }

        if (user.is_verified === 0) {
            return res.status(500).json({
              success: false,
              message: "Please verify your email first.",
            });
          }

        // Step 6 : Check password
        const passwordToCompare = user.password;
        const isMatch = await bcrypt.compare(password, passwordToCompare)
        if(!isMatch){
            return res.json({
                success : false,
                message : "Password does not match."
            })
        }

        // Step 7 : Create token
        const token = jwt.sign(
            {id : user._id, isAdmin : user.isAdmin},
            process.env.JWT_TOKEN_SECRET,
        )

        // Step 8 : Send Response
        res.status(200).json({
            success : true,
            token : token,
            userData : user,
            message : "User logged in successfully."
        })
        
    } catch (error) {
        console.log(error);
        res.json(error)
    }
}

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
        // Add other fields as needed
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
    const user = await Users.findOne({ email: req.body.email });
 
    if (!user) {
      return res.json({
        success: false,
        message: "Email not found.",
      });
    }
    if (user.is_verified === 0) {
      return res.json({
        success: false,
        message: "Please verify your email first.",
      });
    }
    const resetPasswordToken = user.getResetPasswordToken();
 
    await user.save();
 
    // Assuming you have a configuration variable for the frontend URL
    const frontendBaseUrl =
      process.env.FRONTEND_BASE_URL || "http://localhost:3000";
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
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
 
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
 
const resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
 
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
 
    const newPassword = await securePassword(req.body.password);
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
 
    res.status(200).json({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
 

module.exports = {
    createUser, loginUser, verifyMail,   updateUserProfile, forgotPassword, resetPassword
}
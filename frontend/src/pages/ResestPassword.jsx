import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPasswordApi } from "../apis/api";
import { toast } from "react-toastify";
import "../style/ResetPassword.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8 || password.length > 12) {
      errors.push("Password must be 8-12 characters long.");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter.");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter.");
    }
    if (!/\d/.test(password)) {
      errors.push("Password must contain at least one number.");
    }
    if (!/[\W_]/.test(password)) {
      errors.push("Password must contain at least one special character.");
    }
    return errors;

   
  };

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleResetPassword = () => {
    const passwordErrors = validatePassword(newPassword);

    if (passwordErrors.length > 0) {
      passwordErrors.forEach((error) => toast.error(error));
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const data = {
      password: newPassword,
    };

    resetPasswordApi(data, token)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          // Redirect to the login page after successful password reset
          navigate("/login");
        } else {
          // Check for specific error message from the backend
          if (res.data.message === "New password must not match any of the previous passwords.") {
            toast.error("You can't reuse your old password while resetting.");
          } else {
            toast.error(res.data.message);
          }
        }
      })

      
      .catch((err) => {
        console.error("Error resetting password:", err);
        // Add a generic error message for password reuse issue
        toast.error("You can't reuse your old password while resetting.");
      });
  };

  return (
    <div className="background-img4 d-flex justify-content-center">
      <div className="cardr">
        <h2 className="lock-iconr">&#x1F512;</h2>
        <h2 className="rh2">Reset Password</h2>
        <p className="rp">Enter your new password below:</p>
        <input
          type="password"
          className="rpassInput"
          placeholder="Enter your new password"
          onChange={handleNewPassword}
        />
        <input
          type="password"
          className="rpassInput"
          placeholder="Confirm your new password"
          onChange={handleConfirmPassword}
        />
        <button type="button" className="rbutton" onClick={handleResetPassword}>
          Update Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;

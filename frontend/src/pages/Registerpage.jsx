import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createUserApi } from '../apis/api';
import { useNavigate, Link } from 'react-router-dom';
import '../style/Login.css';
import logo from '../images/logo.png';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const navigate = useNavigate();

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const validatePassword = (password) => {
    const lengthRegex = /^.{8,12}$/;
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    const numberRegex = /\d/;
    const specialCharRegex = /[\W_]/;

    let strength = '';

    if (!lengthRegex.test(password)) {
      strength = 'Password must be between 8-12 characters long.';
    } else if (!upperCaseRegex.test(password)) {
      strength = 'Password must contain at least one uppercase letter.';
    } else if (!lowerCaseRegex.test(password)) {
      strength = 'Password must contain at least one lowercase letter.';
    } else if (!numberRegex.test(password)) {
      strength = 'Password must contain at least one number.';
    } else if (!specialCharRegex.test(password)) {
      strength = 'Password must contain at least one special character.';
    } else {
      strength = 'Strong password';
    }

    setPasswordStrength(strength);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error('Please fill all the fields.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    if (passwordStrength !== 'Strong password') {
      toast.error('Password does not meet the complexity requirements.');
      return;
    }

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    createUserApi(data)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          navigate('/login');
        }
      })
      .catch((err) => {
        toast.error('Server error');
        console.error(err.message);
      });
  };

  return (
    <div className="page-container">
      <div className="background-image"></div>
      <div className="login-container" style={{ margin: "20px 0px 50px 0px" }}>
        <img src={logo} alt="Logo" style={{ width: '120px', height: '80px', marginBottom: '20px' }} />
        <h2 style={{ fontSize: '20px' }}>SIGN UP</h2>
        <form onSubmit={handleSubmit} className="custom-form">
          <input
            onChange={handleFirstNameChange}
            type="text"
            className="form-control mb-2 custom-input"
            placeholder="First Name"
            value={firstName}
          />
          <input
            onChange={handleLastNameChange}
            type="text"
            className="form-control mb-2 custom-input"
            placeholder="Last Name"
            value={lastName}
          />
          <input
            onChange={handleEmailChange}
            type="text"
            className="form-control mb-2 custom-input"
            placeholder="Email"
            value={email}
          />
          <input
            onChange={handlePasswordChange}
            type="password"
            className="form-control mb-2 custom-input"
            placeholder="Password"
            value={password}
          />
          <small className="text-muted">{passwordStrength}</small>
          <input
            onChange={handleConfirmPasswordChange}
            type="password"
            className="form-control mb-3 custom-input"
            placeholder="Re-enter Password"
            value={confirmPassword}
          />
          <button type="submit" className="btn btn-primary w-100 mb-2 custom-btn">
            SIGN UP
          </button>
          <p className="text-black text-decoration-none">
            Already have an account? <Link to="/login">SIGN IN</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserApi } from '../apis/api';
import { toast } from 'react-toastify';
import '../style/Register.css';
import logo from '../images/logo.png';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [fnameError, setFnameError] = useState('');
  const [lnameError, setLnameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [cpasswordError, setCPasswordError] = useState('');

  const navigate = useNavigate();

  const validate = () => {
    let isValid = true;
    setFnameError('');
    setLnameError('');
    setEmailError('');
    setPasswordError('');
    setCPasswordError('');

    if (firstName.trim() === '') {
      setFnameError('First Name is required');
      isValid = false;
    }
    if (lastName.trim() === '') {
      setLnameError('Last Name is required');
      isValid = false;
    }
    if (email.trim() === '') {
      setEmailError('Email is required');
      isValid = false;
    }
    if (password.trim() === '') {
      setPasswordError('Password is required');
      isValid = false;
    }
    if (confirmPassword.trim() === '') {
      setCPasswordError('Confirm Password is required');
      isValid = false;
    }
    if (password.trim() !== confirmPassword.trim()) {
      setCPasswordError('Password and Confirm Password must be same');
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) {
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
        }
      })
      .catch((err) => {
        toast.error('Server error');
        console.log(err.message);
      });
  };

  return (
    <div className="page-container">
      <div className="background-image"></div>
      <div className="registration-container">
        <img src={logo} alt="Logo" className="logo" />
        <div className="registration-content">
          <h1>VenVue</h1>
          <h2>Create your Account!</h2>
          <form onSubmit={handleSubmit} className="custom-form">
            <label>First Name</label>
            {fnameError && <span className="text-danger">{fnameError}</span>}
            <input
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              className="form-control mb-2 custom-input"
              placeholder="Enter your First Name"
            />

            <label>Last Name</label>
            {lnameError && <span className="text-danger">{lnameError}</span>}
            <input
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              className="form-control mb-2 custom-input"
              placeholder="Enter your Last Name"
            />

            <label>Email</label>
            {emailError && <span className="text-danger">{emailError}</span>}
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="form-control mb-2 custom-input"
              placeholder="Enter your Email"
            />

            <label>Password</label>
            {passwordError && <span className="text-danger">{passwordError}</span>}
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control mb-3 custom-input"
              placeholder="Enter your Password"
            />

            <label>Confirm Password</label>
            {cpasswordError && <span className="text-danger">{cpasswordError}</span>}
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              className="form-control mb-3 custom-input"
              placeholder="Enter your Confirm Password"
            />

            <button type="submit" className="btn btn-primary w-100 mb-2 custom-btn">
              Create an Account
            </button>

            {/* eslint-disable jsx-a11y/anchor-is-valid */}
<p className="text-black text-decoration-none">
  Already have an Account?{' '}
  <a href="#" onClick={() => navigate('/login')} className="text-black text-decoration-none">
    SIGN IN
  </a>
</p>
{/* eslint-enable jsx-a11y/anchor-is-valid */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

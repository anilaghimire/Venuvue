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
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
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
    <div className="page-container" >
      <div className="background-image"></div>
      <div className="login-container"  style={{margin:"20px 0px 50px 0px"}}>  
        <img src={logo} alt="Logo" style={{ width: '120px', height: '80px', marginBottom: '20px' }} />
        <h2 style={{ fontSize: '20px' }}>SIGN UP</h2>
        <form onSubmit={handleSubmit} className="custom-form">
          <input
            onChange={handleFirstNameChange}
            type="text"
            className="form-control mb-2 custom-input"
            placeholder="First Name"
          />
          <input
            onChange={handleLastNameChange}
            type="text"
            className="form-control mb-2 custom-input"
            placeholder="Last Name"
          />
          <input
            onChange={handleEmailChange}
            type="text"
            className="form-control mb-2 custom-input"
            placeholder="Email"
          />
          <input
            onChange={handlePasswordChange}
            type="password"
            className="form-control mb-2 custom-input"
            placeholder="Password"
          />
          <input
            onChange={handleConfirmPasswordChange}
            type="password"
            className="form-control mb-3 custom-input"
            placeholder="Re-enter Password"
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

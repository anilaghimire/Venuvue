import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { loginUserApi } from '../apis/api';
import { useNavigate, Link } from 'react-router-dom';
import '../style/Login.css';
import logo from '../images/logo.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter both email and password.');
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    loginUserApi(data)
      .then((res) => {
        console.log(res);
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          localStorage.setItem('token', res.data.token);
          const jsonDecode = JSON.stringify(res.data.userData);
          localStorage.setItem('user', jsonDecode);
          navigate("/"); // Navigate to dashboard after successful login
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
      <div className="login-container">
        <img src={logo} alt="Logo" style={{ width: '120px', height: '80px', marginBottom: '20px' }} />
        <h2 style={{ fontSize: '20px' }}>SIGN IN</h2>
        <form onSubmit={handleSubmit} className="custom-form">
          <input
            onChange={changeEmail}
            type="text"
            className="form-control mb-2 custom-input"
            placeholder="Email"
          />
          <input
            onChange={changePassword}
            type="password"
            className="form-control mb-3 custom-input"
            placeholder="Password"
          />
          <button type="submit" className="btn btn-primary w-100 mb-2 custom-btn">
            SIGN IN
          </button>
          <p className="text-black text-decoration-none">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
          <p className="text-black text-decoration-none">
            Don't have an account? <Link to="/register">SIGN UP</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

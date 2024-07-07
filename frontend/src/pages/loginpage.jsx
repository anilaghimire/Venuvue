import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { loginUserApi } from '../apis/api';
import '../style/Login.css'; // Importing CSS file for styling
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook from react-router-dom

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize the useNavigate hook in the login

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
        console.log(res); // Log the response
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          localStorage.setItem('token', res.data.token);
          const jsonDecode = JSON.stringify(res.data.userData);
          localStorage.setItem('user', jsonDecode);
          // Navigate to dashboard after successful login
          navigate("/"); // Use navigate function to navigate to the dashboard
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
        <h1>VenVue</h1>
        <h2>SIGN IN</h2>
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
            <a href="#">Forgot Password?</a>
          </p>
          <p className="text-black text-decoration-none">
            Don't have an account? <a href="#">SIGN UP</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

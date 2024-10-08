import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Navbar.css';
import { FaBookmark } from "react-icons/fa"; // Correct import from react-icons/fa
import logo from '../images/logo.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Get user data from local storage
  const user = JSON.parse(localStorage.getItem('user'));

  // Logout function
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className={`navbar navbar-expand-md ${scrolled ? 'scrolled' : ''}`}>
      <div className="container-fluid">
        {/* Logo and Home Link */}
        <div className="d-flex align-items-center">
          <Link className="navbar-brand me-2" to="/">
            <img src={logo} alt="Logo" height="50" />
          </Link>
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </div>

        {/* My Bookings Link */}
        <Link to="/mybookings" className="nav-link">
          My Bookings
        </Link>

        {/* Rest of the Navbar */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Category
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Wedding and Receptions</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Seminars and Conference</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Birthdays and celebrations</a></li>
              </ul>
            </li>
          </ul>

          <form className="d-flex" role="search">
            <Link to="/cartpage" className="m-4">
              <FaBookmark size={24} color="#C1536B" />
            </Link>
            {user ? (
              <div className="dropdown">
                <button className="btn btn-outline-primary me-2 dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  Welcome, {user.name}!
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  {user.isAdmin && (
                    <li>
                      <Link className="dropdown-item" to="/admindashboard">
                        Edit Products
                      </Link>
                    </li>
                  )}
                  <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                  <li><Link className="dropdown-item" to="/password/reset/:token">Change Password</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button onClick={handleLogout} className="dropdown-item" to="/logout">Logout</button></li>
                </ul>
              </div>
            ) : (
              <div className='d-flex align-items-center'>
                <Link className="btn btn-outline-primary me-2" to={'/login'}>Login</Link>
                <Link className="btn btn-outline-success" to={'/register'}>Register</Link>
              </div>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

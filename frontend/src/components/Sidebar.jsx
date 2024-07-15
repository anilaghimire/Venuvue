import React from 'react';
import { Link } from 'react-router-dom';
import { FaCartPlus, FaListAlt, FaEdit } from 'react-icons/fa';
import '../style/Sidebar.css'; // Optional: if you have specific styles for the sidebar

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/admin/cart">
            <FaCartPlus /> Cart Items
          </Link>
        </li>
        <li>
          <Link to="/admin/bookings">
            <FaListAlt /> Bookings
          </Link>
        </li>
        <li>
          <Link to="/admin/edit/:id">
            <FaEdit /> Edit Product
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

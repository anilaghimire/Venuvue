import React from 'react';
import { Link } from 'react-router-dom';
import { FaCartPlus, FaListAlt, FaEdit, FaClipboardList } from 'react-icons/fa'; // Import the necessary icons
import '../style/Sidebar.css'; 



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
        <li>
          <Link to='/admin/audittrail'>
            <FaClipboardList /> Audit Trail
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

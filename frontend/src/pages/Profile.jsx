import React, { useEffect, useRef, useState } from "react";
import {  getLoggedInUserDetail, updateLoggedInUserDetail } from "../apis/api";
import { toast } from "react-toastify";
import '../style/editprofile.css';
import { useParams } from "react-router-dom";
const Profile = () => {
  const { id } = useParams(); // Access id parameter from URL
 
  const fileInputRef = useRef(null);
 
  const handleImageClick = () => {
     fileInputRef.current.click();
  };
 
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file)
    setUser((user) => ({ ...user, avatar: file }));
  };
 
  const initialUserState = {
    firstName: "",//firstname
  lastName: "", //lastname
    email: "", //email
  };
 
  const [user, setUser] = useState(initialUserState);
 
  useEffect(() => {
    getLoggedInUserDetail(id)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
          return;
        } else if (res.data.success === true) {
          setUser(res.data.user);
        } else {
          toast.error("Internal server error");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal server error");
      });
  }, [id]);
 
  const handleUserUpdate = async () => {
    try {
      const fd = new FormData();
      fd.append("firstName", user.firstName);
      fd.append("lastName", user.lastName);
      fd.append("email", user.email);
      fd.append("avatar", user.avatar)
 
      const res = await updateLoggedInUserDetail(id, fd);
      toast.success(res.data.message);
    } catch (error) {
      const response = await error.response.data;
      console.log(response)
      toast.error(response.message)
      console.log("error: ", error);
    }
  };
  const placeholderAvatar =
    "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=";
 
  return (
    <div className="profile-container">
          <div className="profile-image" onClick={handleImageClick}>
          <img
            src={user.avatar || placeholderAvatar}
            alt="User Profile"
            onError={(e) => console.error("Image loading error", e)}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(e) => handleFileChange(e)}
          />
        </div>
      <div className="profile-section">
 
        <div className="profile-info">
          <h2>Your New Profile</h2>
          <hr />
          <div className="input-group">
            <label>First Name</label>
            <input
              onChange={(event) => setUser((user) => ({ ...user, firstName: event.target.value }))}
              value={user.firstName}
              placeholder="Your New First Name"
              type="text"
            />
          </div>
          <div className="input-group">
            <label>Last Name</label>
            <input
              onChange={(event) => setUser((user) => ({ ...user, lastName: event.target.value }))}
              value={user.lastName}
              placeholder="Your New Last Name"
              type="text"
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              onChange={(event) => setUser((user) => ({ ...user, email: event.target.value }))}
              value={user.email}
              placeholder="Your New Email"
              type="text"
            />
          </div>
          <button onClick={handleUserUpdate} className="save-btn">
            Save Changes
          </button>
        </div>
     
      </div>
    </div>
  );
};
 
export default Profile;
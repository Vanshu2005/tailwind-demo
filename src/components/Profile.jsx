import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './Profile.css';


const Profile = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  // If no user, redirect to login
  if (!user) {
    navigate("/Login");
    return null;
  }

  return (
    <div className="flex justify-center items-center p-6 bg-base-200 min-h-screen">
      <div className="w-full max-w-2xl">
        <EditProfile />
      </div>
    </div>
  );
};

export default Profile;

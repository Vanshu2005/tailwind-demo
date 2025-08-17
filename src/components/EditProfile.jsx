import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';
import UserCard from './UserCard';

const EditProfile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  // const[photoUrl,setPhotoUrl]=useState(user.photoUrl);
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [error, setError] = useState("");

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName,photoUrl, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center gap-8 my-10">
      {/* Edit Profile Form */}
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Profile</h2>

          {/* First Name */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name</legend>
            <input
              type="text"
              className="input"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </fieldset>

          {/* Last Name */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Last Name</legend>
            <input
              type="text"
              className="input"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </fieldset>

          {/* Age */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Age</legend>
            <input
              type="number"
              className="input"
              placeholder="Enter age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </fieldset>

          {/* Gender */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Gender</legend>
            <select
              className="select select-bordered w-full"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </fieldset>

          {/* About */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">About</legend>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Write something about yourself"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </fieldset>

          {/* Error message */}
          <p className="text-red-500 text-sm">{error}</p>

          {/* Save Button */}
          <div className="card-actions justify-center">
            <button className="btn btn-primary w-full" onClick={saveProfile}>
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Preview User Card */}
      <div>
        <UserCard user={{ firstName, lastName, age, gender, about }} />
      </div>

      {/* Toast */}
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;

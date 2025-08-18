import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import './Feed.css';

const Feed = () => {
  // HOOKS must always be at top
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [drag, setDrag] = useState({ startX: 0, startY: 0, isDragging: false });
  const cardRef = useRef(null);

  // Fetch users
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/feed`, { withCredentials: true });
        const usersArray = Array.isArray(res.data.data) ? res.data.data : [];
        setUsers(usersArray);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    getUsers();
  }, []);

  // Swipe action
  const handleAction = (status, deltaX = 0) => {
    if (!users[currentIndex]) return;

    const userId = users[currentIndex]._id;
    cardRef.current.style.transition = "transform 0.5s ease-out";
    cardRef.current.style.transform = `translateX(${deltaX * 5}px) rotate(${deltaX * 0.2}deg)`;

    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      cardRef.current.style.transition = "";
      cardRef.current.style.transform = "translateX(0px) rotate(0deg)";
    }, 300);

    axios.post(`${BASE_URL}/request/send/${status}/${userId}`, {}, { withCredentials: true })
      .catch(err => console.error("Error sending request:", err));
  };

  // Drag events
  const onMouseDown = (e) => {
    setDrag({ startX: e.clientX, startY: e.clientY, isDragging: true });
    cardRef.current.style.transition = "";
  };

  const onMouseMove = (e) => {
    if (!drag.isDragging) return;
    const deltaX = e.clientX - drag.startX;
    const deltaY = e.clientY - drag.startY;
    cardRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${deltaX * 0.1}deg)`;
  };

  const onMouseUp = (e) => {
    if (!drag.isDragging) return;
    const deltaX = e.clientX - drag.startX;
    const threshold = 100;

    if (deltaX > threshold) handleAction("interested", deltaX);
    else if (deltaX < -threshold) handleAction("ignored", deltaX);
    else cardRef.current.style.transform = "translate(0px,0px) rotate(0deg)";

    setDrag({ startX: 0, startY: 0, isDragging: false });
  };

  if (!users || currentIndex >= users.length) {
    return <h1 className="feed-no-users">No new users found!</h1>;
  }

  const currentUser = users[currentIndex];
  const nextUser = users[currentIndex + 1];

  return (
    <div
      className="feed-container"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {nextUser && (
        <div className="tinder-card tinder-card-next">
          <img src={nextUser.photoUrl || "https://placehold.co/400x400"} alt="user" className="tinder-card-img" />
          <div className="tinder-card-body">
            <h2 className="card-title">{nextUser.firstName + " " + nextUser.lastName}</h2>
          </div>
        </div>
      )}

      <div
        className="tinder-card tinder-card-current"
        ref={cardRef}
        onMouseDown={onMouseDown}
      >
        <img src={currentUser.photoUrl || "https://placehold.co/400x400"} alt="user" className="tinder-card-img" />
        <div className="tinder-card-body">
          <h2 className="card-title">{currentUser.firstName + " " + currentUser.lastName}</h2>
          {currentUser.age && currentUser.gender && <p>{currentUser.age + ", " + currentUser.gender}</p>}
          <p>{currentUser.about}</p>
        </div>
      </div>
    </div>
  );
};

export default Feed;

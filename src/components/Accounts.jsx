import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import '../styles/Accounts.css';

const UserCard = ({ id, name, email, isSelected, onSelect, onRemove }) => {
  return (
    <div className={`user-card ${isSelected ? "selected" : ""}`} onClick={onSelect}>
      <div className="avatar"></div>
      <div className="user-info">
        <p className="name">{name}</p>
        {email && <p className="email">{email}</p>}
      </div>
      {isSelected && <div className="checkmark">✔</div>}
      <button className="remove-button" onClick={(e) => { 
        e.stopPropagation(); // Prevent triggering selection
        onRemove(id); 
      }}>
        Remove
      </button>
    </div>
  );
};

const Accounts = () => {
  const navigate = useNavigate(); // Initialize navigation hook
  const [users, setUsers] = useState([
    { id: 1, name: "Clyde Cellan", email: "clydecellan@gmail.com" }
  ]);
  const [selectedUserId, setSelectedUserId] = useState(1);

  const handleUserSelect = (id) => {
    setSelectedUserId(id);
  };

  const handleRemoveUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleAddUser = () => {
    const newUser = {
      id: users.length + 1,
      name: "New User",
      email: null,
    };
    setUsers([...users, newUser]);
  };

  const handleLogout = () => {
    navigate("/"); // Redirect to login page
  };

  const handleContinue = () => {
    navigate("/dashboard"); // Redirect to dashboard page
  };

  return (
    <div className="user-manager">
      <div className="header">
        <div className="icon"></div>
        <div className="header-text">
          <h2>Accounts</h2>
          <p>Switch and manage accounts</p>
        </div>
      </div>
      <div className="user-grid">
        {users.map((user) => (
          <UserCard
            key={user.id}
            id={user.id}
            name={user.name}
            email={user.email}
            isSelected={user.id === selectedUserId}
            onSelect={() => handleUserSelect(user.id)}
            onRemove={handleRemoveUser}
          />
        ))}
        <button className="add-account" onClick={handleAddUser}>
          + Add Account
        </button>
      </div>
      <div className="footer">
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
        <button className="continue" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Accounts;

import React, { useState } from 'react';
import '../styles/ManageUser.css';

const Home = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Clyde Cellan', username: 'clyde_123', role: 'Visitor', lastActivity: 'Today, 5:30pm', status: 'Active', isSelected: false },
    { id: 2, name: 'John Doe', username: 'john_doe', role: 'Admin', lastActivity: 'Yesterday, 8:00pm', status: 'Inactive', isSelected: false },
    { id: 3, name: 'Jane Smith', username: 'jane_smith', role: 'Visitor', lastActivity: 'Last Week, 3:00pm', status: 'Active', isSelected: false },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingUserId, setEditingUserId] = useState(null);
  const [formData, setFormData] = useState({ name: '', username: '', role: '', lastActivity: '' });
  const itemsPerPage = 5;

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSelectAll = () => {
    const allSelected = users.every((user) => user.isSelected);
    const updatedUsers = users.map((user) => ({ ...user, isSelected: !allSelected }));
    setUsers(updatedUsers);
  };

  const handleCheckboxChange = (id) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, isSelected: !user.isSelected } : user
    );
    setUsers(updatedUsers);
  };

  const handleDeleteSelected = () => {
    setUsers(users.filter((user) => !user.isSelected));
  };

  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setFormData({ ...user });
  };

  const handleSave = (id) => {
    const updatedUsers = users.map((user) => (user.id === id ? { ...formData, isSelected: false } : user));
    setUsers(updatedUsers);
    setEditingUserId(null);
  };

  const handleCancel = () => {
    setEditingUserId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="manage-users-container">
      {/* Header */}
      <header className="header">
        <h2>Manage Users</h2>
        <div className="user-count">
          Total Users: <span>{users.length}</span>
        </div>
      </header>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search Here"
            className="search-input"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="filters-button">Filters</button>
        </div>

        <div className="actions">
          <button
            className="delete-user-button"
            onClick={handleDeleteSelected}
            disabled={users.every((user) => !user.isSelected)}
          >
            Delete
          </button>
        </div>
      </div>

      {/* User Table */}
      <table className="user-table">
      <thead>
  <tr>
    <th>
      <input
        type="checkbox"
        onChange={handleSelectAll}
        checked={users.every((user) => user.isSelected)}
        id="select-all-checkbox"
      />
      <label htmlFor="select-all-checkbox" style={{ marginLeft: '8px', cursor: 'pointer' }}>
        Select all
      </label>
    </th>
    <th>Name</th>
    <th>Username</th>
    <th>Role</th>
    <th>Last Activity</th>
    <th>Status</th>
    <th>Actions</th>
  </tr>
</thead>

        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <input
                  type="checkbox"
                  checked={user.isSelected}
                  onChange={() => handleCheckboxChange(user.id)}
                />
              </td>
              {editingUserId === user.id ? (
                <>
                  <td>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                  </td>
                  <td>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                  </td>
                  <td>
                    <input type="text" name="role" value={formData.role} onChange={handleChange} />
                  </td>
                  <td>
                    <input type="text" name="lastActivity" value={formData.lastActivity} onChange={handleChange} />
                  </td>
                  <td>
                    <span className={`status ${user.status.toLowerCase()}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <button className="save-button" onClick={() => handleSave(user.id)}>Save</button>
                    <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td>{user.lastActivity}</td>
                  <td>
                    <span className={`status ${user.status.toLowerCase()}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <button className="edit-button" onClick={() => handleEdit(user)}>Edit</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          {'<'}
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`page-button ${page === currentPage ? 'active' : ''}`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default Home;

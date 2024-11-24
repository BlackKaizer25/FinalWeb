import React, { useState } from 'react';
import '../styles/Evaluation.css'; // Import the CSS file

const Evaluation = () => {
  const [entries, setEntries] = useState([
    { id: 1, name: 'Clyde Cellan', businessType: 'Baileys - Food', location: 'P-7, Damilag', dateSubmitted: 'June 12, 2024', status: 'Pending', isSelected: false },
    { id: 2, name: 'John Doe', businessType: 'Visitor', location: 'Today, 5:30pm', dateSubmitted: 'Today, 5:30pm', status: 'Active', isSelected: false },
    { id: 3, name: 'Jane Smith', businessType: 'Retail', location: 'Downtown', dateSubmitted: 'Last Week, 3:00pm', status: 'Pending', isSelected: false },
  ]);

  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter entries based on search term
  const filteredEntries = entries.filter(
    (entry) =>
      entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.businessType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate filtered entries
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEntries = filteredEntries.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredEntries.length / itemsPerPage);

  // Handle Select All functionality
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    const updatedEntries = entries.map((entry) => ({ ...entry, isSelected: newSelectAll }));
    setEntries(updatedEntries);
  };

  // Handle individual checkbox selection
  const handleCheckboxChange = (id) => {
    const updatedEntries = entries.map((entry) =>
      entry.id === id ? { ...entry, isSelected: !entry.isSelected } : entry
    );
    setEntries(updatedEntries);
    setSelectAll(updatedEntries.every((entry) => entry.isSelected)); // Update Select All checkbox
  };

  // Handle Search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Handle Delete Selected Entries
  const handleDelete = () => {
    setEntries(entries.filter((entry) => !entry.isSelected));
    setSelectAll(false); // Reset Select All checkbox
  };

  // Handle Approve Selected Entries
  const handleApprove = () => {
    const updatedEntries = entries.map((entry) =>
      entry.isSelected ? { ...entry, status: 'Active', isSelected: false } : entry
    );
    setEntries(updatedEntries);
    setSelectAll(false); // Reset Select All checkbox
  };

  return (
    <div className="for-approval-container">
      {/* Header Section */}
      <header className="header">
        <h2>Approval</h2>
        <div className="header-stats">
          <span>Total Entries: {entries.length}</span>
          <div className="status-count">
            <span className="done-count">
              {entries.filter((e) => e.status === 'Active').length} Active
            </span>
            <span className="in-progress-count">
              {entries.filter((e) => e.status === 'Pending').length} Pending
            </span>
          </div>
        </div>
      </header>

      {/* Toolbar Section */}
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
            className="approve-button"
            onClick={handleApprove}
            disabled={entries.every(
              (entry) => !entry.isSelected || entry.status === 'Active'
            )}
          >
            Approve
          </button>
          <button
            className="delete-button"
            onClick={handleDelete}
            disabled={entries.every((entry) => !entry.isSelected)}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Approval Table */}
      <table className="approval-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                id="select-all-checkbox"
              />
              <label htmlFor="select-all-checkbox" style={{ marginLeft: '5px', cursor: 'pointer' }}>
                Select all
              </label>
            </th>
            <th>Name</th>
            <th>Business Type</th>
            <th>Location</th>
            <th>Date Submitted</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEntries.map((entry) => (
            <tr key={entry.id} className={entry.isSelected ? 'selected-row' : ''}>
              <td>
                <input
                  type="checkbox"
                  checked={entry.isSelected}
                  onChange={() => handleCheckboxChange(entry.id)}
                />
              </td>
              <td>{entry.name}</td>
              <td>{entry.businessType}</td>
              <td>{entry.location}</td>
              <td>{entry.dateSubmitted}</td>
              <td>
                <span className={`status ${entry.status.toLowerCase()}`}>
                  {entry.status}
                </span>
              </td>
              <td>
                <button className="more-options">...</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Section */}
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

export default Evaluation;

import React, { useState } from 'react';
import Masjid from './Masjid';
import 'bulma/css/bulma.min.css';

const SearchLocations = () => {
  const [selectedMasjid, setSelectedMasjid] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Mock data - Replace with real data from your backend
  const masjids = [
    { id: 'masjid1', name: 'ADAMS MCCL' },
    { id: 'masjid2', name: 'ADAMS Main Center' },
    { id: 'masjid3', name: 'ADAMS Location 3' },
    { id: 'masjid4', name: 'ADAMS Location 4' },
    // More masjids...
  ];

  const handleMasjidSelect = (masjidName) => {
    // Find the masjid object by its name
    const masjid = masjids.find(m => m.name === masjidName);
    setSelectedMasjid(masjid);
    setDropdownOpen(false);
  };

  return (
    <div className="project-card-container">
      <div className="card">
        <div className="card-header">
          <p className="card-header-title custom-card-header-title">Search Locations</p>
        </div>
        <div className="card-content">
          <div className={`dropdown ${dropdownOpen ? 'is-active' : ''}`}>
            <div className="dropdown-trigger">
              <button 
                className="button" 
                aria-haspopup="true" 
                aria-controls="dropdown-menu" 
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span>Select Masjid</span>
                <span className="icon is-small">
                  <i className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
              <div className="dropdown-content" style={{ textAlign: 'left' }}>
                {masjids.map(masjid => (
                  <a 
                    href="#!" 
                    className="dropdown-item" 
                    key={masjid.id}
                    onClick={(e) => {
                      e.preventDefault();
                      handleMasjidSelect(masjid.name);
                    }}
                  >
                    {masjid.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Masjid Card */}
      <br /><br /><br /><br /><br /><br />
      {selectedMasjid && <Masjid name={selectedMasjid.name} />}
    </div>
  );
}

export default SearchLocations;

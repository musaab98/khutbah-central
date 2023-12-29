import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Masjid from './Masjid';
import 'bulma/css/bulma.min.css';

const SearchLocations = () => {
  const [selectedMasjid, setSelectedMasjid] = useState(null);
  const [masjids, setMasjids] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const config = require('../config.json'); // Ensure your config.json is correctly set up

  useEffect(() => {
    const fetchMasjids = async () => {
      try {
        const res = await axios.get(`${config.api.invokeUrl}/masjids`);
        setMasjids(res.data);
      } catch (err) {
        console.log(`An error has occurred: ${err}`);
      }
    };

    fetchMasjids();
  }, []);

  const handleMasjidSelect = (masjidId) => {
    const masjid = masjids.find(m => m.id.S === masjidId);
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
                {masjids.map((masjid, index) => (
                  <a
                    href="#!"
                    className="dropdown-item"
                    key={masjid.id.S || index} // Using DynamoDB string format
                    onClick={(e) => {
                      e.preventDefault();
                      handleMasjidSelect(masjid.id.S); // Using DynamoDB string format
                    }}
                  >
                    {masjid.id.S}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <br /><br /><br /><br /><br /><br />
      {selectedMasjid && <Masjid name={selectedMasjid.id.S} />} {/* Passing masjid ID as name */}
    </div>
  );
}

export default SearchLocations;

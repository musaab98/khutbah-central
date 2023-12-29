import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bulma/css/bulma.min.css';

const Masjid = ({ name }) => {
  const times = ["12:00", "1:00", "2:00"];
  const [masjids, setMasjids] = useState([]);
  const config = require('../config.json'); // Ensure your config.json is correctly set up

  useEffect(() => {
    const fetchMasjids = async () => {
      try {
        const res = await axios.get(`${config.api.invokeUrl}/masjids`);
        setMasjids(res.data);
        console.log(res.data); // Log for debugging
      } catch (err) {
        console.log(`An error has occurred: ${err}`);
      }
    };

    fetchMasjids();
  }, []); // Runs once when the component mounts

  return (
    <div className="project-card-container">
      <div className="card">
        <div className="card-header">
          <p className="card-header-title custom-card-header-title">{name}</p>
        </div>
        <div className="card-content">
          <p>{name} Jumuah Prayer Times:</p>
          {/* {masjids.map((masjid, index) => (
            <a key={index} href="#">{masjid.id.S}</a> // Adjust according to your DynamoDB attribute format
          ))} */}
          <br />
          {times.map((time, index) => (
            <button key={index}>{time}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Masjid;

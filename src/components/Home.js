// import React, { useState } from 'react';
import SearchLocations from './SearchLocations';
import 'bulma/css/bulma.min.css';

const Home = () => {
  // const [selectedProject, setSelectedProject] = useState(projects[0]);

  return (
    // <div className="columns is-vcentered" style={{paddingLeft: '20px', paddingRight: '20px'}}>
    <div className="admin-container">
      <div>
        <h2 className="has-text-centered">Home</h2>
        <br /><br /><br /><br /><br />
        <SearchLocations />
      </div>
      {/* <div className="column">
        <SearchLocations />
      </div> */}
    </div>
  );
}

export default Home;

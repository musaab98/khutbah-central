import React from 'react';
// import { Card, CardHeader, CardTitle, CardBody, Button } from 'reactstrap';

const Masjid = ({ name }) => {
  // Times could be passed as props or fetched from an API call
//   const times = ["12:00", "1:00", "2:00"];

  return (
<div className="project-card-container">
      <div className="card">
        <div className="card-header">
          <p className="card-header-title custom-card-header-title">{name}</p>
        </div>
        <div className="card-content">
            <button>Time 1</button>
            <button>Time 2</button>
            <button>Time 3</button>
        </div>
      </div>
    </div>
  );
};

export default Masjid;

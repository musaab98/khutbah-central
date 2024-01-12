import React, { useState, Component, Fragment } from 'react';
import SearchLocations from './SearchLocations';
import 'bulma/css/bulma.min.css';

export default class Home extends Component {

  render() {
    // console.log({'abcdef': 'HELLO WORLD!!!'}['abcdef']);
    return (
      // <div className="columns is-vcentered" style={{paddingLeft: '20px', paddingRight: '20px'}}>
      <div className="admin-container">
        <div>
          <h2 className="has-text-centered">Home</h2>
          <br /><br /><br /><br /><br />
          <SearchLocations />
        </div>
      </div>
    );
  }
}
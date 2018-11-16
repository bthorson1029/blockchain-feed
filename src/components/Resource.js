import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



export default function Resource(props) {

  const resourceId = props.id;

  return (
    <div>
      <div className="card">
          <div className="resourceImage">
            <img className="projectImage img-fluid"
              src={props.imageUrl}
              alt={props.name}
            />
          </div>
        <div className="projectDetails">
          <div className="projectType"><p>{props.type}</p></div>
          <div className="projectTitle"><h3>{props.name}</h3></div>
          <button style={{ color: '#dd425c' }}>View Project</button>
        </div>
      </div>
    </div>
  );
};



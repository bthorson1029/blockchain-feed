import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



export default function Resource(props) {

  const resourceId = props.id;

  return (
    <div className="cardContainer">
      <div className="card">
        <a href={props.resourceUrl} target="_blank">
          <div className="card-img-top">
            <img className="sourceImage img-fluid"
              src={props.imageUrl}
              alt={props.title}
            />
          </div>
        <div className="card-body">
          <div className="projectType"><p>{props.type}</p></div>
          <div className="sourceTitle"><h3>{props.title}</h3></div>
          <div className="sourceDescription card-text"><small>{props.description}</small></div>
        </div>
        </a>
        <div className="card-footer">
          <div className="footerLeft">
            <div className="viewCount">{54}</div>
            <i className="fas fa-eye"></i>
          </div>
          <div className="footerRight">
          </div>
        </div>
      </div>
    </div>
  );
};


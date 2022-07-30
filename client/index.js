import React from 'react';
import reactDom from 'react-dom';

//import bootstrap's CSS and JS file
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";

import "./stylesheets/style.css"
import * as bootstrap from 'bootstrap';

import App from './components/App.jsx'


//mount our React app to the index.html at root element
reactDom.render(< App/>, document.querySelector("#root"));
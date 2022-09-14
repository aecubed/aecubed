import React from 'react';
import reactDom from 'react-dom';

//import bootstrap's CSS and JS file
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
import App from './components/App.jsx';


// mount our React app to the index.html at root element. 
// The || is because React Testing Library doesn't load index.html and therefore can't find #root
reactDom.render(<App/>, document.querySelector('#root') || document.createElement('div'));
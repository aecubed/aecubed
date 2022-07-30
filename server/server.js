const path = require('path');
const PORT = 3000;
const apiController = require('./apiController');
const express = require('express');
const server = express();

const contact = require('./routes/contact_us')
const map = require('./routes/map')
const about = require('./routes/about')



server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/contact', contact);
server.use('/map', map);
server.use('/about', about);


server.get('/', (req, res, next) => {
  res.send('Hello World')
});


server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = server;
const path = require('path');
const PORT = 3000;
const apiController = require('./apiController');
const express = require('express');
const server = express();

<<<<<<< HEAD
// const contact = require('./routes/contact_us')
// const map = require('./routes/map')
// const about = require('./routes/about')


=======
const contactRouter = require('./routes/contact_us')
const mapRouter = require('./routes/map')
const aboutRouter = require('./routes/about')
>>>>>>> dev

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

<<<<<<< HEAD
server.use('/contact', contact);
// server.use('/map', map);
server.use('/about', about);


=======
>>>>>>> dev
server.get('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

// server.use('/contact', contactRouter);
server.use('/map', mapRouter);
// server.use('/about', aboutRouter);

// catch-all route handler for any requests to an unknown route
server.use('*', (req, res) => res.status(404).send('This is not the page you\'re looking for...'));

/**
 * express error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */
 server.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = server;
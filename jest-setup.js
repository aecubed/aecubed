/* NOTE: This is not currently in use. 
The following needs to be added to the jest section in package.json
It's not because there's something wrong with this file despite matching the testing module
		"globalSetup": "./jest-setup.js",
		"globalTeardown": "./jest-teardown.js",
*/

import regeneratorRuntime from 'regenerator-runtime';

module.exports = () => {
  global.testServer = require('./server');
};

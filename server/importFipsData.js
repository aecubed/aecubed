const fs = require('fs');
const { Fips } = require('./apiModel.js');

const readline = require('readline');
const file = readline.createInterface({
  input: fs.createReadStream('./server/data.txt'),
  output: process.stdout,
  terminal: false
});

file.on('line', async (line) => {
  const ln = line.split('\t');
  Fips.create({ fips: ln[0], county: ln[1], state: ln[2] }, (req, res) => {
    try {
      console.log('insert success!!');
    } catch {
      console.log('insert err!!!');
    }
  });
});
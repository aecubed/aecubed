const fs = require('fs');
const { Fips } = require('./apiModel.js')

const readline = require('readline');
const { fips } = require('crypto');
const file = readline.createInterface({
  input: fs.createReadStream('./server/data.txt'),
  output: process.stdout,
  terminal: false
});

file.on('line', async (line) => {
  let ln = line.split('\t');
  // create instance and save to the database
  // console.log(ln)
  Fips.create({ fips: ln[0], county: ln[1], state: ln[2] }, (req, res) => {
    try {
      console.log("insert success!!")
    } catch {
      console.log('insert err!!!')
    }
  });
});
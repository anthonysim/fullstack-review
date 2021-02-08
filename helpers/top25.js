const axios = require('axios');
const Repo = require('../database/index.js')

// request list of all items in database.
// sort items from largest to smallest.
// grab the first 25 then send it back to the client.

const top25 = (callback) => {
  console.log(Repo)
  console.log('you are getting something back!')
  // Model.find({}).then(data => console.log(data))
}








module.exports.top25 = top25;
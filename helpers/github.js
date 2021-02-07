const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {

  const apiURL = `https://api.github.com/users/${username}/repos`;

  let options = {
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  axios.get(apiURL, options)
    .then(res => callback(null, res))
    .catch(() => console.error('Sorry username does NOT exist, try again!'))
}

module.exports.getReposByUsername = getReposByUsername;
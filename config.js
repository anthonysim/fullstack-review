const dotenv = require('dotenv');

// config secret files
dotenv.config({ path: './config/config.env' })


module.exports = {
  TOKEN: process.env.GITHUB_TOKEN
};
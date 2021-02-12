const mongoose = require('mongoose');
const dotenv = require('dotenv');

// config secret files
dotenv.config({ path: './config/config.env' })



mongoose.connect(process.env.MONGO_URI, { useMongoClient: true });
const axios = require('axios');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: String,
  name: String,
  created_at: String,
  star_count: Number,
  login: String,
  url: String,
});

let Repo = mongoose.model('Repo', repoSchema);



// This function should save a repo or repos to the MongoDB
exports.save = (data, callback) => {

  const reposArr = [];
  for (let i = 0; i < data.length; i++) {
    const { id, name, created_at, stargazers_count, html_url } = data[i];
    const { login } = data[i]['owner'];

    const reposObj = {
      id: id,
      name: name,
      created_at: created_at,
      star_count: stargazers_count,
      login: login,
      url: html_url
    }

    reposArr.push(reposObj)
  }

  Repo.findOne({ login: reposArr[0]['login'] }, (err, username) => {
    if (err) {
      console.error(err)

    } if (username) {
      console.log(`${username} is already in the database, please type in a different username!`)

    } else {
      Repo.insertMany(reposArr)
        .then(() => callback(null, 'Multiple Documents Saved!'))
        .catch(err => callback('Something went wrong, did not save!', null))
    }
  })
}

// This function gets the top 25 "stared" repos
exports.top25 = (callback) => {
  Repo.find({})
    .then(models => {

      const modelArr = models.map(model => model['_doc'])
        .sort((a, b) => (a.star_count < b.star_count) ? 1 : -1)

      callback(null, modelArr)
    })
    .catch(() => callback('Something went wrong, database may be empty!', null))
}

// module.exports.save = save;

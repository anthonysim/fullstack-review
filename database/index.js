const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', { useMongoClient: true })
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
exports.save = (data) => {
  // TODO: Your code here
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
  // console.log(reposArr[0]['login'])

  Repo.findOne({ login: reposArr[0]['login'] }, (err, data) => {
    if (err) {
      console.error(err)

    } if (data) {
      console.log('This user is already in the database, please type in a different username!')

    } else {
      Repo.insertMany(reposArr)
        .then(() => console.log('Multiple Documents Saved!'))
        .catch(err => console.error('Something went wrong, did not save!'))
    }
  })
}

// This function gets the top 25 "stared" repos
exports.top25 = (callback) => {
  Repo.find({})
    .then(models => {

      const modelArr = models.map(model => model['_doc'])
        .filter(({ star_count }) => star_count > 50)
        .sort((a, b) => (a.star_count < b.star_count) ? 1 : -1)

      callback(null, modelArr)
    })
    .catch(() => callback('Something went wrong, database may be empty!', null))
  // console.log('you are getting something back!')
}

// module.exports.save = save;

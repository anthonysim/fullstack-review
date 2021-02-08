const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', { useMongoClient: true })

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: String,
  name: String,
  created_at: String,
  star_count: Number,
  owner_id: String,
  owner_login: String,
});

let Repo = mongoose.model('Repo', repoSchema);

// This function should save a repo or repos to the MongoDB
let save = (data) => {
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
  console.log(reposArr)

  Repo.insertMany(reposArr)
    .then(() => console.log('Multiple Documents Saved!'))
    .catch(err => console.error('Something went wrong, did not save!'))
}

module.exports.save = save;
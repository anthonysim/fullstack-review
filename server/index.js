const express = require('express');
const app = express();
const api = require('../helpers/github.js');
const db = require('../database/index.js');

app.use(express.static(__dirname + '/../client/dist'));

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  res.send('25 repos were retrieved from database!')
});

app.post('/repos/:term', function (req, res) {
  // TODO - your code here!

  // This route should take the github username provided
  const { term } = req.params;

  // and get the repo information from the github API, then
  api.getReposByUsername(term, (error, response) => {
    if (error) {
      console.log(error)

    } else {
      db.save(response.data);
      res.end();
      // res.send(response.data)
    }
  })
});



// Server Connection
let port = 1128;
app.listen(port, () => console.log(`listening on port ${port}`));


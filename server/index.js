const express = require('express');
const app = express();
const api = require('../helpers/github.js');
// const top = require('../apis/top25.js');
const db = require('../database/index.js');

app.use(express.static(__dirname + '/../client/dist'));

app.get('/repos', function (req, res) {
  // This route should send back the top 25 repos
  // rev.();
  res.send('25 repos were retrieved from database!')
});

app.post('/repos/:term', function (req, res) {

  const { term } = req.params;

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


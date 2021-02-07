const express = require('express');
const app = express();
const api = require('../helpers/github.js');

app.use(express.static(__dirname + '/../client/dist'));

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  res.send('it works!')
});

app.post('/repos/:term', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  const { term } = req.params;
  console.log(term);

  api.getReposByUsername(term, (err, data) => {
    if (err) {
      console.log(err)

    } else {
      console.log(data)
    }
  })
  res.end();
});



// Server Connection
let port = 1128;
app.listen(port, () => console.log(`listening on port ${port}`));


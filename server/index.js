const express = require('express');
const app = express();
const api = require('../helpers/github.js');
const { save, top25 } = require('../database/index.js');

app.use(express.static(__dirname + '/../client/dist'));

app.get('/repos', function (req, res) {

  top25((err, model) => {
    if (err) {
      console.error(err)
      res.end();

    } else {
      // console.log(model)
      // res.end()
      res.send(model)
    }
  })
});

app.post('/repos/:term', function (req, res) {

  const { term } = req.params;

  api.getReposByUsername(term, (error, response) => {
    if (error) {
      console.log(error)
      res.end();

    } else {

      save(response.data, (err, message) => {
        if (err) {
          console.error(err)
          res.end();

        } else {
          console.log(message)
          res.end();
        }
      })
    }
  })
});



// Server Connection
let port = 1128;
app.listen(port, () => console.log(`listening on port ${port}`));


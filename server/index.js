const express = require('express');
const db = require('./db/index');
const routes = require('./routes.js')
const app = express();
const port = 1337;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./client/build"));



app.get('/', (req, res) => {
  res.render('index');
});

app.post('/cohort', (req, res) => {
  var c = new db.cohorts(req.body)
  c.save()
    .then(() => { res.status(201).send() })
    .catch(() => { res.status(500).send() })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


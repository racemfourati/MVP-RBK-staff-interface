const express = require('express');
const db = require('./db/index');
const app = express();
const port = 1337;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./client/build"));



app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


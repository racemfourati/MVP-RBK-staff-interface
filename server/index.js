const express = require('express');
const db = require('./db/index');
const app = express();
const port = 1337;
const crypt = require('./hash')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./client/build"));


var sc = '0101'


app.get('/', (req, res) => {
  res.render('index');
});


//-------------------------------cohort------------------------------//

app.post('/cohort', (req, res) => {
  var c = new db.cohorts(req.body)
  c.save()
    .then(() => { res.status(201).send() })
    .catch((err) => { res.status(500).send(err) })
})

app.get('/cohort', (req, res) => {
  db.cohorts.find()
    .then((data) => { res.send(data) })
    .catch((err) => { res.status(404).send() })
});

app.delete('/cohort/:id', (req, res) => {
  db.cohorts.findByIdAndDelete(req.params.id)
    .then((data) => {
      db.students.deleteMany({ cohort_name: data.name })
        .then((data) => res.status(204).send())
        .catch((err) => console.log(err))
    })
})

//-------------------------------cohort------------------------------//



//-------------------------------students------------------------------//

app.get('/student/:cn', (req, res) => {
  db.students.find({ cohort_name: req.params.cn })
    .then((data) => { res.send(data) })
    .catch((err) => { console.log('error getting students') })
})

app.post('/student', (req, res) => {
  var t = new db.students(req.body)
  t.save()
    .then((data) => {
      db.cohorts.findOneAndUpdate({ name: data.cohort_name }, { $inc: { students_number: 1 } })
        .then(() => { res.status(201).send() })
        .catch((err) => { res.status(500).send(err) })
    })

})

app.delete('/student/:id', (req, res) => {
  db.students.findByIdAndDelete(req.params.id)
    .then((data) => res.status(204).send())
    .catch((err) => console.log(err))
})

app.put('/student/:id', (req, res) => {
  db.students.findByIdAndUpdate(req.params.id, { name: req.body.name, age: req.body.age, image: req.body.image, comments: req.body.comments })
    .then((data) => res.status(201).send())
    .catch((err) => console.log(err))
})
//-------------------------------students------------------------------//








//-------------------------------user------------------------------//
app.post('/signin', (req, res) => {
  if (req.body.scode === sc) {

    var salt = crypt.createRandom32String()
    var hased = crypt.createHash(req.body.password, salt)
    var user = new db.users({ username: req.body.username, email: req.body.email, password: hased, salt: salt })
    user.save()
      .then(() => { res.status(201).send(true) })
      .catch((err) => { res.status(500).send(err) })
  }

  else {
    res.send('wrong code')
  }

})





app.post('/login', (req, res) => {
  console.log(req.body)
  db.users.find({ username: req.body.username })
    .then((data) => {
      if (crypt.compareHash(req.body.password,data[0].password,data[0].salt)) {
        res.status(201).send(true)
      }
      else {
        res.status(500).send('wrong password')
      }
    })
    .catch(() => { throw Error(`no user called ${req.body.username}`) })


})

//-------------------------------user------------------------------//


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


module.exports.app = app

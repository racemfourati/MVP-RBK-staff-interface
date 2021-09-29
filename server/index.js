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
  .then((data)=>{db.students.deleteMany({ cohort_name: data.name })
.then((data) => res.status(204).send())
    .catch((err) => console.log(err))
})
    

})

app.get('/student/:cn',(req,res)=>{
  db.students.find({cohort_name:req.params.cn})
  .then((data)=>{res.send(data)})
  .catch((err)=>{console.log('error getting students')})
})

app.post('/student', (req, res) => {
  var t = new db.students(req.body)
  t.save()
    .then(() => { res.status(201).send() })
    .catch((err) => { res.status(500).send(err) })
})

app.delete('/student/:id' , (req,res)=>{
  db.students.findByIdAndDelete(req.params.id)
  .then((data) => res.status(204).send())
    .catch((err) => console.log(err))
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


module.exports.app = app

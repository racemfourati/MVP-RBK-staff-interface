const mongoose=require('mongoose')

const db=mongoose.connect('mongodb://localhost:27017/MVP',{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{console.log('db working')})
.catch(()=>{console.log('db problem')})
 

const Users = new mongoose.Schema({
    username: String,
    email:String,
    password:String,

  });

  const Cohorts = new mongoose.Schema({
    name: { type: String, unique: true },
    start_date:Date,
    students_number:{type:Number,default:0}
  });


  const Students = new mongoose.Schema({
    name: String,
    age:Number,
    image:String,
    comments:[String],
    cohort_name:String
  });

  const users = mongoose.model('Users', Users);
  const cohorts = mongoose.model('Cohorts', Cohorts);
  const students = mongoose.model('Students', Students);

  module.exports.users=users
  module.exports.cohorts=cohorts
  module.exports.students=students
  module.exports.db=db


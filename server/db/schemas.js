const Promise = require('bluebird');
const mongoose=require('./index')

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

  const Users = mongoose.model('Users', Users);
  const Cohorts = mongoose.model('Cohorts', Cohorts);
  const Students = mongoose.model('Students', Students);

  module.exports.Users=Users
  module.exports.Cohorts=Cohorts
  module.exports.Students=Students
const mongoose=require('mongoose')
const db=mongoose.connect('mongodb://localhost:27017/MVP');


module.exports=db


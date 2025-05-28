const mongoose=require('mongoose')
const studSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
      course:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model('Student',studSchema)
const dotenv=require('dotenv')
const mongoose=require('mongoose')

dotenv.config()
const connect=()=>{
    const mongo_url=process.env.mongo_url
        mongoose.connect(mongo_url)

try{
    console.log("connected")
}catch(err){
    console.log('error:',err)
}
}
module.exports=connect
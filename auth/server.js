const express=require('express')
const app=express()
const dotenv=require('dotenv')
const port=process.env.port||3000
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const user=require('./models/user')
const auth=require('./middleware/authMiddleware')
const authenticate = require('./middleware/authMiddleware')
dotenv.config()
app.use(express.json())
const mongo_url=process.env.mongo_url

try{
    mongoose.connect(mongo_url)
    console.log("connected")
}catch(err){
    console.log('error:',err)
}
//post
app.post('/register',async(req,res,next)=>{
    try{
        const {username,password}=req.body
        const existing=await user.findOne({username})
        if (existing) return res.status(400).json({error})
        const user1=new user({username,password})
        await user1.save()
        res.status(200).send("success")
    }
    catch(err){
        next(err)
        console.log(err)
    }
})
//login post
app.post('/login',async (req,res,next)=>{
    try{
        const {username,password}=req.body
        const user2=await user.findOne({username})
        if(!user2||!(await user2.comparePassword(password) )){
            return res.status(400).json({error})
        }
        const token=jwt.sign(
            {id:user2._id,username:user2.username

            } ,
            process.env.jwt_token,
            {expiresIn:'1h'}
        )
        
        res.json({token})
    }catch(err){
        console.log('failed',err)
    }
})
//dashboard
app.get('/dashboard',authenticate,(req,res)=>{
    res.json({message:`welcome,${req.user.username}`})

})
app.listen(port,()=>{console.log('http://localhost:3000')})
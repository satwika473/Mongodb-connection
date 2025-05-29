//authentication ensures the user is who they are.
//we use JWT json web tokens for stateless auth- the most common method in REST API
//Steps:
//npm i express nodemon mongoose dotenv bcryptjs jsonwebtoken -->install
//connect to database ,create schema
//create middleware
const jwt=require('jsonwebtoken')
const authenticate=(req,res,next)=>{
    const token=req.header('Authorization')?.replace('Bearer','')
    if(!token) return res.status(400).json({error:'no token provided'})

try{
    const decoded=jwt.verify(token,process.env.jwt_token)
    req.user=decoded
    next()
}
catch(err){
    console.log(err)
}
}
module.exports=authenticate
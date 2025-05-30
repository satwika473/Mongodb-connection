const jwt=require('jsonwebtoken')
const user=require('../models/user')
exports.register=(async(req,res,next)=>{
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
exports.login=(async (req,res,next)=>{
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
exports.dashboard=(req,res)=>{
    res.json({message:`welcome,${req.user.username}`})

}
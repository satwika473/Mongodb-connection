const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    }
})
//hashing pwd by using bcrypt
//salt is the random letters for bcrypt
//pre used for before going to db, pwd is saved
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
    next()
})
//compares pwd
userSchema.methods.comparePassword=function(candidatePassword){
    return bcrypt.compare(candidatePassword,this.password)
}

module.exports=mongoose.model('user',userSchema)


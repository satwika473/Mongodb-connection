const express=require('express')
const router=express.Router()
const {register,login,dashboard}=require('../controllers/authController')
const authenticate=require('../middleware/authMiddleware')
router.post('/register',register)
router.post('/login',login)
router.get('/dashboard',authenticate,dashboard)
module.exports=router
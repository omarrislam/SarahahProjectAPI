const app=require('express').Router()
const userModel=require('../models/user.model')
const bcrypt=require('bcrypt')
const { validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const validation=require('../validation/login.validation')
app.post('/handleLogin',validation,async(req,res)=>{
    const {email,password}=req.body
    let errors=validationResult(req)
    if(errors.isEmpty()){
        let user=await userModel.findOne({email})
        if(user){
            let match=await bcrypt.compare(password,user.password)
            if(match){
                if(user.confirmation){
                    var token=jwt.sign({userID:user._id,name:user.name,isLoggedIn:true, role:user.role},'omar')
                    res.json({message:"You're successfully logged in",token})
                }else{
                    res.json({message:"Please,confirm your account first"})
    
                }
            }else{
                res.json({message:"Incorrect password"})
            }
        }else{
        res.json({message:"Account doesn't exist"})

        }
    }else{
        res.json({message:"Validation error",errorMessage:errors.errors})
    }

})
module.exports=app
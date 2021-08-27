const app=require('express').Router()
const messageModel=require('../models/message.model')
const auth=require('../middleware/auth')
const authorized=require('../middleware/authorization')
app.get('/home',auth,async(req,res)=>{
   try {
    let messages= await messageModel.find({userID:req.userID})
    res.json({messages})
   } catch (error) {
    res.json({message:"Catch home error"})
       
   }
})

app.get('/shareProfile',auth,authorized("user"),(req,res)=>{
    try {
        URL=req.protocol+"://"+req.headers.host+"/send/"+req.userID
    res.json({"Your Profile URL is":URL})
    } catch (error) {
    res.json({message:"Catch share profile error"})
        
    }
})
module.exports=app
const app=require('express').Router()
const messageModel=require('../models/message.model')
const userModel=require('../models/user.model')
app.post('/send/:id',async(req,res)=>{
  let id=req.params.id
  const {message}=req.body
  try {
    let user=await userModel.findOne({_id:id})
    if(user){
      await messageModel.insertMany({message,time:Date.now(),userID:id})
      res.json({message:"Message Sent"})
    }else{
        res.json({message:"Account doesn't exist"})
    }
  } catch (error) {
    res.json({message:"catch sendmessage error"})
      
  }
  
})
module.exports=app
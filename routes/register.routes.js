const app =require('express').Router()
const userModel=require('../models/user.model')
const validation =require('../validation/register.validation')
const { validationResult } = require('express-validator');
const bcrypt=require('bcrypt')
const nodemailer = require("nodemailer");
var jwt = require('jsonwebtoken');


app.post('/handleRegister',validation,async(req,res)=>{
    let protocol=req.protocol
    let host=req.headers.host
    let URL=protocol+"://"+host
    const{name,email,password,passwordConfirmation}=req.body
    let errors=validationResult(req)
try {
    if(errors.isEmpty()){
        let user=await userModel.findOne({email})
        if(user){
            res.json({message:"Account already exists"})
        }else{
            bcrypt.hash(password,7,async(err,hash)=>{
                if(err){
                    res.json({message:"hash error"})
                }else{
                    var token = jwt.sign({email}, 'omar');
                    let transporter = nodemailer.createTransport({
                        service:'gmail',
                        auth: {
                          user: 'omareslam07@gmail.com', // generated ethereal user
                          pass: 'Omar@1234', // generated ethereal password
                        },
                      });

                      let info = await transporter.sendMail({
                        from: 'omareslam07@gmail.com', // sender address
                        to: email, // list of receivers
                        subject: "Hello ✔", // Subject line
                        html: `<b><a href="${URL}/check/${token}">Click to confirm your account</a></b>`, // html body
                      });  
                    await userModel.insertMany({name,email,password:hash})
                    res.json({message:"Registered successfully"})
                }
            })
        }
    }else{
        res.json({message:"validation error",errorMessage:errors.errors})
    }
} catch (error) {
    res.json({message:"Catch registeration error",errorM:error})
}

})

app.get('/check/:token',async(req,res)=>{
    let token=req.params.token
    try {
        jwt.verify(token, 'omar',async function(err, decoded) {
            if(err){
                res.json({message:"invalid token"})
            }else{
                let email=decoded.email
                await userModel.findOneAndUpdate({email},{confirmation:true})
                res.json({message:"Confirmation Succeded"})
    
            }
          });
    } catch (error) {
        res.json({message:"catch check error",error})
        
    }
})



module.exports=app
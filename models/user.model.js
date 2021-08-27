const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    confirmation:{type:Boolean,default:false},
    role:{type:String,default:'user'}
})

module.exports=mongoose.model('user',userSchema)
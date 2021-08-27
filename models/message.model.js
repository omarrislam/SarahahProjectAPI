
const mongoose=require('mongoose')

const messageSchema=mongoose.Schema({
    message:String,
    time:String,
    userID:{type:mongoose.Schema.Types.ObjectId,ref:"user"}
    
})

module.exports=mongoose.model('message',messageSchema)
var jwt = require('jsonwebtoken');

module.exports=(req,res,next)=>{
    let token=req.header('token')
try {
    jwt.verify(token, 'omar', function(err, decoded) {
        if(err){
            res.json({message:"Invalid Token"})
        }else{
            if(decoded.isLoggedIn){
                req.userID=decoded.userID
                req.name=decoded.name
                req.role=decoded.role
                next()
            }else{
                res.json({message:"Please login first"})
            }
        }
      });
} catch (error) {
    res.json({message:"Auth error catch",error})   
}
}
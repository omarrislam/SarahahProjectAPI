module.exports=(role)=>{
try {
    return (req,res,next)=>{
        if(req.role!=role){
            res.status(401)
            return res.send('Unauthorized access')
        }else{
            next()

        }
    }
} catch (error) {
    res.json({message:"Catch Authorization error"})
}
}
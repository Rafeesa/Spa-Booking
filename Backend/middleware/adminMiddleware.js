const adminMiddleware=(req,res,next)=>{
    const user=req.user
    if(user && user.role==='admin')
    {
        next()
    }
    else
    {
        return res.status(401).json({message:"admin can only access"})
    }
}

module.exports=adminMiddleware;
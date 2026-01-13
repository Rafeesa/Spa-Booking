const bcrypt=require ("bcrypt")
const User=require ("../models/User")
const jwt=require("jsonwebtoken")

const SignUp=async(req,res)=>{
    try {
        const {name,email,password}=req.body
        if(!name||!email||!password)
        {
            return res.status(400).json({message:"all fields are required"})
        }
        const existingUser=await User.findOne({email})
        if(existingUser)
        {
            return res.status(400).json({message:"user already existed"})
        }
        //const hashedPassword=await bcrypt.hash(password,10)
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password, salt);
        const user=new User({
            name,
            email,
            password:hashedPassword
        })
        await user.save()
         const token=jwt.sign({userId:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"7d"})
        res.status(201).json({message:"user succefully registered",token})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
}

const login=async (req,res)=>{
   try {
     const {email,password}=req.body
    if(!email||!password)
    {
        return res.status(400).json({message:"email and password are required"})
    }
    const user=await User.findOne({email})
    if(!user)
    {
        return res.status(400).json({message:"invalid credentials"})
    }
    if(user && await (bcrypt.compare(password,user.password))){
        const token=jwt.sign({userId:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"7d"})
        return res.status(200).json({message:"user loged in successfully",token})
    }
    return res.status(400).json({message:"invalid credentials"})
    
   } catch (error) {
    console.log(error)
    res.status(500).json({message:"server error"})
   }
}

module.exports={
    SignUp,
    login
}
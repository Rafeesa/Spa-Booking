const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const authRoutes=require ("./routes/authRoutes")
require("dotenv").config()

const app=express()

app.use(cors())
app.use(express.json())
app.use("api/auth",authRoutes)

app.get("/",(req,res)=>{
    res.send("server is running")
})

const connectDB=async ()=>{
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("mongoDB connected")
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1)
  }
}

const port=process.env.PORT||5000
connectDB();
app.listen(port,()=>{
    console.log(`server is running on the port ${port}`)

})
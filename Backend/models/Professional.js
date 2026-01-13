const mongoose=require("mongoose")

const ProfessionalSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        required:true,
        default:true
    }
},
{timestamps:true}
)

module.exports=mongoose.model("Professional",ProfessionalSchema)

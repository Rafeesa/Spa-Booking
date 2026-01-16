const mongoose=require("mongoose")

const BookingSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    services:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Service",
        required:true
    }],
    professionals:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Professional",
        required:true
    }],
    startTime:{
        type:Date,
        required:true
    },
    endTime:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:['pending','confirmed','completed'],
        default:'pending'
    }
},
{
    timestamps:true
})

module.exports=mongoose.model("Booking",BookingSchema)
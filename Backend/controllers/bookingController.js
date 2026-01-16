const Booking=require('../models/Booking')
const Service=require('../models/Service')
const Professional=require('../models/Professional')
const User = require('../models/User')
 
const createBooking=async(req,res)=>{
    try {
        const {services,professionals,startTime}=req.body

        const id=req.user.userId
      //  const user=await User.findById(id)
        if(!services||services.length==0)
        {
           return res.status(400).json({message:"choose atleast one service"})
        }
         if(!professionals||professionals.length==0)
        {
        return res.status(400).json({message:"choose professional"})
        }
        if(!startTime)
        {
            return res.status(400).json({message:"start time is required"})
        }
        const newStart=new Date(startTime)
        const currentTime=new Date()
        if(newStart<currentTime)
        {
            return res.status(400).json({message:"Choose valid time"})
        }
        const choosenServices=await Service.find({_id:{$in:services}})
        let totalDuration=choosenServices.reduce((acc,s)=>acc+s.duration,0)
        let newEnd=new Date(newStart.getTime()+totalDuration*60000)
        for(let professionalId of professionals){
            const overlap=await Booking.findOne({
                        professionals:professionalId,
                        status:{$in:['pending','confirmed']},
                        startTime:{$lt:newEnd},
                        endTime:{$gt:newStart} 
            })
            if(overlap){
                return res.status(400).json({message:"professional doesn't have slot for this time"})
            }
        }
        const booking=new Booking({
            userId:id,
            services,
            professionals,
            startTime:newStart,
            endTime:newEnd,
            status:"pending"
        })

        await booking.save();
        res.status(201).json({message:"Booking created successfully"})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"servererror"})
    }
}

const getAllBooking=async(req,res)=>{
    try {
        const userId=req.user.userId
       const bookings=await Booking.find({userId})
        res.status(201).json(bookings)
    } catch (error) {
        console.error(error)
        return res.status(500).json({message:"server error"})
    }
}

const updateBooking=async(req,res)=>{
    try {
        const userId=req.user.userId
        const {id}=req.params
        const {services,professionals,startTime}=req.body
        const booking=await Booking.findById(id)
       if(!booking)
       {
        return res.status(400).json({message:"Booking not found"})
       }
       if(booking.userId.toString()!==userId)
       {
        return res.status(400).json({message:"not a logged in user"})
       }
         if(booking.status=='completed')
         {
            return res.status(400).json({message:"completed update can not be update"})
         }
        const newStart=new Date(startTime)
        const currentTime=new Date()
        if(newStart<currentTime)
        {
            return res.status(400).json({message:"Choose valid time"})
        }
        const choosenServices=await Service.find({_id:{$in:services}})
        let totalDuration=choosenServices.reduce((acc,s)=>acc+s.duration,0)
        let newEnd=new Date(newStart.getTime()+totalDuration*60000)
        for(let professionalId of professionals){
            const overlap=await Booking.findOne({
                        _id:{$ne:booking.id},
                        professionals:professionalId,
                        status:{$in:['pending','confirmed']},
                        startTime:{$lt:newEnd},
                        endTime:{$gt:newStart}

            })
            if(overlap){
                return res.status.json({message:"professional doesn't have slot for this time"})
            }
        }
      
        booking.services=services
        booking.professionals=professionals
        booking.startTime=newStart
        booking.endTime=newEnd
        await booking.save()
        res.status(201).json({message:"Booking updated successfully"})
       
    } catch (error) {
        console.error(error)
        res.status(400).json({message:"server error"})
    }
}
const deleteBooking=async(req,res)=>{
    try {
        const userId=req.user.userId
        const {id}=req.params
        const booking=await Booking.findById(id)
         if(!booking)
        {
            return res.status(400).json({message:"booking not found"})
        }
        if(booking.userId.toString()==userId)
        {
            return res.status(400).json({message:"unautherized"})
        }
        if(booking.status=='confirmed'||booking.status=='completed')
        {
        
       return res.status(400).json({message:"confirmed or completed booking can't delete"})
        }
       await booking.deleteOne()
       res.status(200).json({message:"booking deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"server error"})
    }
}



module.exports={
    createBooking,
    getAllBooking,
    updateBooking,
    deleteBooking
}
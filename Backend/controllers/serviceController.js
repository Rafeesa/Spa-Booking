const Service=require ("../models/Service")

const createService=async(req,res)=>{
    try {
        const {name,duration,price} =req.body
    if(!name||!duration||!price)
    {
        return res.status(400).json({message:"all fields are required"})
    }
    const service=new Service({
        name,
        duration,
        price
    })
    await service.save();
    res.status(200).json({
        message:"service created successfully"
    })
    } catch (error) {
        console.error(error)
        return res.status(500).json({message:"server error"})
    }
}

const getAllServices=async(req,res)=>{
    try {
        const services=await Service.find()
        res.status(200).json(services)
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"server error"})
    }
}

const updateService=async(req,res)=>{
try {
    const {id}=req.params
    const {name,duration,price}=req.body
    const service=await Service.findById(id)
    if(!service)
    {
        return res.status(400).json({message:"service not found"})
    }
    service.name=name
    service.duration=duration
    service.price=price

    await service.save();
    res.status(201).json({message:"service updated succesfully",service})
    
} catch (error) {
    console.error(error)
    res.status(500).json({message:"server error"})
    
}
}

const deleteService=async(req,res)=>{
    try {
        const {id}=req.params
        const service=await Service.findById(id)
        if(!service)
        {
            return res.status(400).json({message:"service not found"})
        }
        await service.deleteOne()
        res.status(200).json({message:"service deleted successfully"})
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"server error"})
    }
}


module.exports={
    createService,
    getAllServices,
    updateService,
    deleteService
};
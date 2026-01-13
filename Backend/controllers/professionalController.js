const Professional=require ("../models/Professional")

const createProfessional=async(req,res)=>{
   try {
    const {name,isActive}=req.body
    if(!name)
    {
     res.status(400).json({message:"name is required"})   
    }
    const professional=new Professional({
        name,
        isActive
    })
    await professional.save();
    return res.status(201).json({message:"Professional created successfully",professional})
    
   } catch (error) {
    console.error(error)
    res.status(500).json({message:"server error"})

    
   }

}


const getAllProfessional=async(req,res)=>{
    try {
        const professionals=await Professional.find()
        res.status(201).json(professionals)
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"server error"})
    }
}

const updateProfessional=async(req,res)=>{
    try {
        const {id}=req.params
        const {name,isActive}=req.body
        const professional=await Professional.findById(id)
        if(!professional)
            return res.status(400).json({message:"professional not found"})
        professional.name=name
        professional.isActive=isActive
        await professional.save()
        res.status(400).json({message:"professional updated successfully",professional})

    } catch (error) {
        console.error(error)
        res.status(500).json({message:"server error"})
    }
}

const deleteProfessional=async(req,res)=>{
    try {
        const {id}=req.params
        const professional=await professional.findById(id)
         if(!professional)
            return res.status(400).json({message:"professional not found"})
        await professional.deleteOne();
        res.status(400).json({message:"professional deleted successfully"})

    } catch (error) {
       console.error(error)
       res.status(500).json({message:"server error"}) 

    }
}

module.export={
    createProfessional,
    getAllProfessional,
    updateProfessional,
    deleteProfessional
}
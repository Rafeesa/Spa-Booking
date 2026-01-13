const express=require("express")
const router=express.Router()

const {createProfessional,getAllProfessional, updateProfessional,deleteProfessional}=require ("../controllers/professionalController")

const authmiddleware=require("../middleware/authmiddleware")
const adminMiddleware=require("../middleware/adminMiddleware")


router.get("/",authmiddleware,getAllProfessional)
router.post("/",authmiddleware,adminMiddleware,createProfessional)
router.put("/:id",authmiddleware,adminMiddleware,updateProfessional)
router.delete("/:id",authmiddleware,adminMiddleware,deleteProfessional)

module.exports=router;
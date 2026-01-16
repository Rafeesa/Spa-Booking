const express=require("express")
const router=express.Router()

const {createProfessional,getAllProfessional,updateProfessional,deleteProfessional}=require ("../controllers/professionalController")

const authMiddleware=require("../middleware/authmiddleware")
const adminMiddleware=require("../middleware/adminMiddleware")


router.get("/",authMiddleware,getAllProfessional)
router.post("/",authMiddleware,adminMiddleware,createProfessional)
router.put("/:id",authMiddleware,adminMiddleware,updateProfessional)
router.delete("/:id",authMiddleware,adminMiddleware,deleteProfessional)

module.exports=router;
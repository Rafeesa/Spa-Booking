const express=require ("express")
const router= express.Router()

const {createService,getAllServices, updateService, deleteService}=require("../controllers/serviceController")
const authmiddleware=require("../middleware/authmiddleware")
const adminMiddleware=require("../middleware/adminMiddleware")


router.get("/",authmiddleware,getAllServices)
router.post("/",authmiddleware,adminMiddleware,createService)
router.put("/:id",authmiddleware,adminMiddleware,updateService)
router.delete("/:id",authmiddleware,adminMiddleware,deleteService)

module.exports=router;
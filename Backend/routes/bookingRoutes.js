const express=require("express")
const router=express.Router()
const {createBooking,getAllBooking,updateBooking,deleteBooking}=require ("../controllers/bookingController")

const adminMiddleware=require("../middleware/adminMiddleware")
const authMiddleware=require("../middleware/authmiddleware")


router.post('/',authMiddleware,createBooking)
router.get('/',authMiddleware,getAllBooking)
router.put('/:id',authMiddleware,updateBooking)
router.delete('/:id',authMiddleware,deleteBooking)
module.exports=router;
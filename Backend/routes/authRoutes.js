const express=require ("express")
const router= express.Router()

const {SignUp,login}=require ("../controllers/authController")

router.post("/signup",SignUp)
router.post("/login",login)

module.exports=router;
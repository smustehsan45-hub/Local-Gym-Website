const express=require("express")
const router=express.Router();
const authContoller=require("../controllers/authController")
const { signupSchema, signinSchema }=require("../validators/auth-validator")
const validate=require("../middlwares/validate-middleware");
const authMiddleware = require("../middlwares/auth-middleware");
router.route("/").get(authContoller.home)
router.route("/register").post(validate(signupSchema),authContoller.register)
router.route("/login").post(validate(signinSchema),authContoller.login)
router.route("/user").get(authMiddleware,authContoller.user)

module.exports=router
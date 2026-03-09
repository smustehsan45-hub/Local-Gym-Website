const express=require("express");
const authMiddleware = require("../middlwares/auth-middleware");
const adminMiddleware = require("../middlwares/admin-middleware");
const adminController=require("../controllers/admin-controller")
const router=express.Router();

router.route("/users").get(authMiddleware,adminMiddleware,adminController.getAllUsers)
router.route("/users/update/:id").patch(authMiddleware,adminMiddleware, adminController.updateUserById)
router.route("/users/:id").get(authMiddleware,adminMiddleware, adminController.getUserById)
router.route("/users/delete/:id").delete(authMiddleware,adminMiddleware, adminController.deleteUserById)
router.route("/contacts").get(authMiddleware,adminMiddleware, adminController.getAllContacts)
router.route("/contacts/delete/:id").delete(authMiddleware,adminMiddleware, adminController.deleteContactById)
router.get("/bookings", authMiddleware, adminController.getAllBookings);
router.delete("/bookings/delete/:id", authMiddleware, adminMiddleware, adminController.deleteBookingById);


module.exports=router
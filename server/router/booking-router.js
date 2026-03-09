const express = require("express");
const router = express.Router();
const auth = require("../middlwares/auth-middleware");
const { bookService, getMyBooking, cancelBooking } = require("../controllers/booking-controller");

router.post("/book", auth, bookService);
router.get("/mybooking", auth, getMyBooking);
router.delete("/cancel", auth, cancelBooking);

module.exports = router;

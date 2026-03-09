const Booking = require("../models/booking-model");

// Prevent duplicate booking
const bookService = async (req, res) => {
  try {
    const existingBooking = await Booking.findOne({ username: req.user.email });

    if (existingBooking) {
      return res.status(400).json({ message: "You already have an active booking." });
    }

    const { services, total, startDate, endDate } = req.body;

    if (!services || !total || !startDate || !endDate) {
      return res.status(400).json({ message: "All booking fields are required" });
    }

    const booking = new Booking({
      username: req.user.email,
      services,
      total,
      startDate,
      endDate,
    });

    const saved = await booking.save();
    res.status(201).json({ message: "Booking successful", booking: saved });
  } catch (error) {
    res.status(500).json({ message: "Booking failed", error });
  }
};

// Get current user's active booking
const getMyBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ username: req.user.email });
    if (!booking) {
      return res.status(404).json({ message: "No booking found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error fetching booking", error });
  }
};

// Cancel current user's booking
const cancelBooking = async (req, res) => {
  try {
    const deleted = await Booking.findOneAndDelete({ username: req.user.email });
    if (!deleted) return res.status(404).json({ message: "No booking to cancel" });
    res.status(200).json({ message: "Booking canceled" });
  } catch (error) {
    res.status(500).json({ message: "Cancel failed", error });
  }
};

// Optional: Get full booking history
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ username: req.user.email }).sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

module.exports = { bookService, getMyBooking, cancelBooking, getUserBookings };

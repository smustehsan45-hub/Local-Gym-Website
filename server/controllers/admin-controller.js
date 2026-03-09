const User = require("../models/user-model");
const Contact = require("../models/contact-model");
const Booking = require("../models/booking-model"); // ✅ Import booking model

// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 });
    if (!users || users.length === 0) {
      return res.status(400).json({ msg: "No users found" });
    }
    return res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

// ✅ Get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find(); // Fetch all bookings
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found" });
    }
    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Admin fetch bookings error:", error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

// ✅ Delete a booking by ID
const deleteBookingById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Booking.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking canceled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting booking", error });
  }
};

// Update user
const updateUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedUserData = req.body;
    const updatedData = await User.updateOne({ _id: id }, {
      $set: updatedUserData,
    });
    return res.status(200).json(updatedData);
  } catch (error) {
    next(error);
  }
};

// Get single user
const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({ _id: id }, { password: 0 });
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// Delete user
const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Get all contacts
const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    if (!contacts || contacts.length === 0) {
      return res.status(400).json({ msg: "No contacts found" });
    }
    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

// Delete contact
const deleteContactById = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Contact.deleteOne({ _id: id });
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  updateUserById,
  getUserById,
  deleteUserById,
  getAllContacts,
  deleteContactById,
  getAllBookings,        // ✅ Added
  deleteBookingById 
};

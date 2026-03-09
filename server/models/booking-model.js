const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  services: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;

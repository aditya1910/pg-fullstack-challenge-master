// All mongo schema is exported from here 
const mongoose = require('mongoose');

const userDetailsSchema = require('./User');
const bookingSchema = require('./Booking');

module.exports = {
  User: mongoose.model('User', userDetailsSchema),
  Booking: mongoose.model('Booking', bookingSchema),
};

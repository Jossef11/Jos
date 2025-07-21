const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  coordinates: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  type: {
    type: String,
    enum: ['petrol station', 'hotel'],
    required: true,
  },
  contact: {
    type: String,
  },
});

module.exports = mongoose.model('Location', LocationSchema);

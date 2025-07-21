const express = require('express');
const router = express.Router();
const Location = require('../models/Location');

// @route   GET api/locations
// @desc    Get all locations
// @access  Public
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/locations/:type
// @desc    Get all locations of a specific type
// @access  Public
router.get('/:type', async (req, res) => {
  try {
    const locations = await Location.find({ type: req.params.type });
    res.json(locations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/locations
// @desc    Add a new location
// @access  Public
router.post('/', async (req, res) => {
  const { name, address, coordinates, type, contact } = req.body;

  try {
    const newLocation = new Location({
      name,
      address,
      coordinates,
      type,
      contact,
    });

    const location = await newLocation.save();
    res.json(location);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

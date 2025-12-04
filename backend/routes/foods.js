const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const isSeller = require('../middleware/isSeller');
const upload = require('../utils/multer');
const Food = require('../models/Food');
const fs = require('fs');
const path = require('path');

// Create food (seller only)
router.post('/', auth, isSeller, upload.single('image'), async (req, res) => {
  try {
    const { name, price, description, category, status } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
    const food = new Food({ name, price, description, category, status, imageUrl, createdBy: req.userId });
    await food.save();
    res.json(food);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all foods
router.get('/', async (req, res) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 });
    res.json(foods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single food
router.get('/:id', async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: 'Not found' });
    res.json(food);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update (seller only)
router.put('/:id', auth, isSeller, upload.single('image'), async (req, res) => {
  try {
    const { name, price, description, category, status } = req.body;
    const update = { name, price, description, category, status };
    if (req.file) update.imageUrl = `/uploads/${req.file.filename}`;
    const food = await Food.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!food) return res.status(404).json({ message: 'Not found' });
    res.json(food);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete (seller only)
router.delete('/:id', auth, isSeller, async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) return res.status(404).json({ message: 'Not found' });
    // optional: delete file
    if (food.imageUrl) {
      const filename = path.basename(food.imageUrl);
      const p = path.join(__dirname, '..', 'uploads', filename);
      fs.unlink(p, (err) => { /* ignore */ });
    }
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

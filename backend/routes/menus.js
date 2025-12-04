const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../utils/multer');
const Menu = require('../models/Menu');

// Create menu (with optional image)
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { name, price, status } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;
    const menu = new Menu({ name, price, status, imagePath, createdBy: req.userId });
    await menu.save();
    res.json(menu);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Read all menus
router.get('/', async (req, res) => {
  try {
    const menus = await Menu.find().sort({ createdAt: -1 });
    res.json(menus);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Read single
router.get('/:id', async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) return res.status(404).json({ message: 'Not found' });
    res.json(menu);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const { name, price, status } = req.body;
    const update = { name, price, status };
    if (req.file) update.imagePath = `/uploads/${req.file.filename}`;
    const menu = await Menu.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!menu) return res.status(404).json({ message: 'Not found' });
    res.json(menu);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete
router.delete('/:id', auth, async (req, res) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    if (!menu) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

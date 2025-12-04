const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const isSeller = require('../middleware/isSeller');
const Order = require('../models/Order');

// Create order (authenticated users)
router.post('/', auth, async (req, res) => {
  try {
    const { items, total } = req.body;
    if (!items || !items.length) return res.status(400).json({ message: 'No items' });
    const order = new Order({ user: req.userId, items, total });
    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get orders
// Sellers see all orders, regular users see their own
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.userId;
    // check if seller
    const OrderModel = Order;
    const user = req.userId;
    // naive check: rely on isSeller middleware if route needed
    // Fetch user role by populating will be done by isSeller for seller-specific route
    // We'll detect seller by attempting to require user role via User lookup to avoid circular import; instead provide seller-only route below.
    return res.status(400).json({ message: 'Use /api/orders/me or /api/orders/seller' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get orders for current user
router.get('/me', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Seller: get all orders
router.get('/seller', auth, isSeller, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).populate('user', 'name email');
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single order (seller or owner)
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) return res.status(404).json({ message: 'Not found' });
    // allow if owner or seller
    // load user role
    const User = require('../models/User');
    const user = await User.findById(req.userId);
    if (String(order.user._id) !== String(req.userId) && user.role !== 'seller') return res.status(403).json({ message: 'Forbidden' });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

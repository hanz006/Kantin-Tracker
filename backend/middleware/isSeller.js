const User = require('../models/User');

module.exports = async function (req, res, next) {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    const user = await User.findById(userId);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    if (user.role !== 'seller') return res.status(403).json({ message: 'Forbidden: seller only' });
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

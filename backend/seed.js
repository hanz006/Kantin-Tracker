const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config();
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/kantin-tracker';

async function run(){
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('connected');
  const email = 'seller@example.com';
  const existing = await User.findOne({ email });
  if (existing) {
    console.log('seller already exists:', email);
    process.exit(0);
  }
  const hash = await bcrypt.hash('password123', 10);
  const u = new User({ name: 'Seller', email, password: hash, role: 'seller' });
  await u.save();
  console.log('created seller', email, 'password: password123');
  process.exit(0);
}

run().catch(err=>{ console.error(err); process.exit(1) });

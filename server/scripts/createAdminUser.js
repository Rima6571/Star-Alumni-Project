import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import User from '../models/User.js';

dotenv.config();

const getArgValue = (flag) => {
  const index = process.argv.indexOf(flag);
  if (index === -1) return undefined;
  return process.argv[index + 1];
};

const adminEmail =
  getArgValue('--email') || process.env.ADMIN_EMAIL || 'admin@example.com';
const adminPassword =
  getArgValue('--password') || process.env.ADMIN_PASSWORD || 'admin123';
const adminName =
  getArgValue('--name') || process.env.ADMIN_NAME || 'Admin User';

const run = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is missing. Add it to your server .env file.');
  }

  if (!adminEmail || !adminPassword || !adminName) {
    throw new Error('Admin name, email, and password are required.');
  }

  if (adminPassword.length < 6) {
    throw new Error('Admin password must be at least 6 characters long.');
  }

  await connectDB();

  const normalizedEmail = adminEmail.toLowerCase().trim();
  const existing = await User.findOne({ email: normalizedEmail }).select('+password');

  if (existing) {
    existing.name = adminName;
    existing.email = normalizedEmail;
    existing.role = 'admin';
    existing.password = adminPassword;
    await existing.save();

    console.log('Updated existing admin user:');
    console.log(`Name: ${existing.name}`);
    console.log(`Email: ${existing.email}`);
    console.log(`Role: ${existing.role}`);
  } else {
    const created = await User.create({
      name: adminName,
      email: normalizedEmail,
      password: adminPassword,
      role: 'admin',
    });

    console.log('Created admin user:');
    console.log(`Name: ${created.name}`);
    console.log(`Email: ${created.email}`);
    console.log(`Role: ${created.role}`);
  }

  await mongoose.disconnect();
};

run().catch(async (error) => {
  console.error('Failed to create admin user:', error.message);
  try {
    await mongoose.disconnect();
  } catch {
    // no-op
  }
  process.exit(1);
});

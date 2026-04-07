import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', (req, res) => {
  const { email, role = 'student' } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const token = jwt.sign(
    {
      id: 'demo-user-id',
      email,
      role,
    },
    process.env.JWT_SECRET || 'dev-secret',
    { expiresIn: '1d' },
  );

  return res.json({
    token,
    user: {
      name: role === 'student' ? 'Vaibhavi Patil' : 'Vaibhav Kulkarni',
      email,
      role,
    },
  });
});

export default router;

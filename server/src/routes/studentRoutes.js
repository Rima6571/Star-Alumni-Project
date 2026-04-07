import { Router } from 'express';
import { demoData } from '../data.js';
import { authenticate, authorizeRoles } from '../middleware/auth.js';

const router = Router();

router.get('/profile', authenticate, authorizeRoles('student'), (req, res) => {
  res.json({ data: demoData.studentProfile });
});

router.put('/profile', authenticate, authorizeRoles('student'), (req, res) => {
  Object.assign(demoData.studentProfile, req.body);
  res.json({ message: 'Profile updated', data: demoData.studentProfile });
});

router.get('/applications', authenticate, authorizeRoles('student'), (req, res) => {
  res.json({ data: demoData.applications });
});

router.get('/events', authenticate, authorizeRoles('student'), (req, res) => {
  res.json({ data: demoData.studentEvents });
});

export default router;

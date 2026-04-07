import { Router } from 'express';
import { demoData } from '../data.js';
import { authenticate, authorizeRoles } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, authorizeRoles('student', 'alumni'), (req, res) => {
  res.json({ data: demoData.alumni });
});

router.get('/:id', authenticate, authorizeRoles('student', 'alumni'), (req, res) => {
  const alumni = demoData.alumni.find((item) => item.id === req.params.id);
  if (!alumni) {
    return res.status(404).json({ message: 'Alumni not found' });
  }
  return res.json({ data: alumni });
});

export default router;

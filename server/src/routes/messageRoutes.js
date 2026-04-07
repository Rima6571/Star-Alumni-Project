import { Router } from 'express';
import { demoData } from '../data.js';
import { authenticate, authorizeRoles } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, authorizeRoles('student', 'alumni'), (req, res) => {
  res.json({ data: demoData.messages });
});

export default router;

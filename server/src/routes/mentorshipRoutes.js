import { Router } from 'express';
import { demoData } from '../data.js';
import { authenticate, authorizeRoles } from '../middleware/auth.js';

const router = Router();

router.post('/request', authenticate, authorizeRoles('student'), (req, res) => {
  const alumni = demoData.alumni.find((item) => item.id === req.body.alumniId);
  if (!alumni) {
    return res.status(404).json({ message: 'Alumni not found' });
  }

  demoData.mentorshipRequests.push({
    id: Date.now().toString(),
    alumniName: alumni.name,
    company: alumni.company,
    status: 'Pending',
  });

  return res.status(201).json({ message: 'Mentorship request sent' });
});

export default router;

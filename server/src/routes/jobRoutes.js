import { Router } from 'express';
import { demoData } from '../data.js';
import { authenticate, authorizeRoles } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, authorizeRoles('student', 'alumni'), (req, res) => {
  res.json({ data: demoData.jobs });
});

router.post('/apply', authenticate, authorizeRoles('student'), (req, res) => {
  const job = demoData.jobs.find((item) => item.id === req.body.jobId);
  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }

  demoData.applications.push({
    id: Date.now(),
    jobTitle: job.title,
    company: job.company,
    appliedDate: new Date().toISOString().slice(0, 10),
    status: 'Pending',
  });

  return res.status(201).json({ message: 'Application submitted' });
});

export default router;

import { Router } from 'express';
import { applyForJob, createJob, getJobs } from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';
import { alumniOnly, studentOnly } from '../middleware/roleMiddleware.js';

const router = Router();

router.get('/', protect, getJobs);
router.post('/', protect, alumniOnly, createJob);
router.post('/apply', protect, studentOnly, applyForJob);

export default router;

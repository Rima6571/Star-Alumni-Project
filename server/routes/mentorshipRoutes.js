import { Router } from 'express';
import {
  autoAssignMentorship,
	getMentorshipRequests,
	requestMentorship,
	respondMentorshipRequest,
} from '../controllers/mentorshipController.js';
import { protect } from '../middleware/authMiddleware.js';
import { alumniOnly, studentOnly } from '../middleware/roleMiddleware.js';

const router = Router();

router.post('/request', protect, studentOnly, requestMentorship);
router.post('/auto-assign', protect, studentOnly, autoAssignMentorship);
router.get('/requests', protect, alumniOnly, getMentorshipRequests);
router.post('/respond', protect, alumniOnly, respondMentorshipRequest);

export default router;

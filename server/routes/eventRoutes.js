import { Router } from 'express';
import { createEvent, getEvents, registerEvent } from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';
import { alumniOnly, studentOnly } from '../middleware/roleMiddleware.js';

const router = Router();

router.get('/', protect, getEvents);
router.post('/', protect, alumniOnly, createEvent);
router.post('/register', protect, studentOnly, registerEvent);

export default router;

import { Router } from 'express';
import { getConversation, getConversations, sendMessage } from '../controllers/messageController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = Router();

router.use(protect, authorize('alumni', 'student'));

router.get('/', getConversations);
router.post('/send', sendMessage);
router.get('/:userId', getConversation);

export default router;

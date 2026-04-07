import { Router } from 'express';
import {
  findAlumni,
  getMyProfile,
  getMyApplications,
  getMyEventRegistrations,
  getMyMentorshipRequests,
  parseResumeAndUpdateSkills,
  getStudentDashboardSummary,
  updateMyProfile,
} from '../controllers/studentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { studentOnly } from '../middleware/roleMiddleware.js';

const router = Router();

router.use(protect, studentOnly);

router.get('/profile', getMyProfile);
router.put('/profile', updateMyProfile);
router.get('/dashboard', getStudentDashboardSummary);
router.post('/resume/parse', parseResumeAndUpdateSkills);
router.get('/alumni', findAlumni);
router.get('/applications', getMyApplications);
router.get('/events', getMyEventRegistrations);
router.get('/mentorship', getMyMentorshipRequests);

export default router;

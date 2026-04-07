import { Router } from 'express';
import {
  deleteMyEvent,
  deleteMyJob,
  getAlumniList,
  getAlumniImpact,
  getMyApplications,
  getMyEvents,
  getMyJobs,
  getMyProfile,
  getStudentsForAlumni,
  updateMyProfile,
} from '../controllers/alumniController.js';
import { protect } from '../middleware/authMiddleware.js';
import { alumniOnly, studentOnly } from '../middleware/roleMiddleware.js';

const router = Router();

router.get('/', protect, studentOnly, getAlumniList);
router.get('/profile', protect, alumniOnly, getMyProfile);
router.put('/profile', protect, alumniOnly, updateMyProfile);
router.get('/impact', protect, alumniOnly, getAlumniImpact);
router.get('/students', protect, alumniOnly, getStudentsForAlumni);
router.get('/jobs', protect, alumniOnly, getMyJobs);
router.delete('/jobs/:id', protect, alumniOnly, deleteMyJob);
router.get('/events', protect, alumniOnly, getMyEvents);
router.delete('/events/:id', protect, alumniOnly, deleteMyEvent);
router.get('/applications', protect, alumniOnly, getMyApplications);

export default router;

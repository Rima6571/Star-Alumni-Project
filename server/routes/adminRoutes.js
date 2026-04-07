import { Router } from 'express';
import {
  exportAdminData,
  getAdminAnalytics,
  getAdminDashboard,
  getAdminProfile,
  getAdminReports,
  getEventsForAdmin,
  getJobsForAdmin,
  approveEvent,
  approveJob,
  deleteUser,
  getAlumni,
  getStudents,
  rejectEvent,
  rejectJob,
  updateAdminPassword,
  updateAdminProfile,
} from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/roleMiddleware.js';

const router = Router();

router.use(protect, adminOnly);

router.get('/dashboard', getAdminDashboard);
router.get('/analytics', getAdminAnalytics);
router.get('/export', exportAdminData);
router.get('/reports', getAdminReports);
router.get('/profile', getAdminProfile);
router.put('/profile', updateAdminProfile);
router.put('/password', updateAdminPassword);

router.get('/students', getStudents);
router.get('/alumni', getAlumni);
router.get('/jobs', getJobsForAdmin);
router.put('/jobs/approve/:id', approveJob);
router.put('/jobs/reject/:id', rejectJob);
router.get('/events', getEventsForAdmin);
router.put('/events/approve/:id', approveEvent);
router.put('/events/reject/:id', rejectEvent);
router.delete('/user/:id', deleteUser);

export default router;

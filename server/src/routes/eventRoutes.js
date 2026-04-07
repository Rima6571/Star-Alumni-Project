import { Router } from 'express';
import { demoData } from '../data.js';
import { authenticate, authorizeRoles } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, authorizeRoles('student', 'alumni'), (req, res) => {
  res.json({ data: demoData.events });
});

router.post('/register', authenticate, authorizeRoles('student'), (req, res) => {
  const event = demoData.events.find((item) => item.id === req.body.eventId);
  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }

  demoData.studentEvents.push({
    id: Date.now(),
    eventTitle: event.title,
    date: event.date,
    location: event.location,
    status: 'Registered',
  });

  return res.status(201).json({ message: 'Event registration successful' });
});

export default router;

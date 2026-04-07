import Event from '../models/Event.js';
import User from '../models/User.js';

export const createEvent = async (req, res, next) => {
  try {
    const { title, description, date, location, eventType } = req.body;

    if (!title || !description || !date || !location) {
      res.status(400);
      throw new Error('Title, description, date and location are required');
    }

    const event = await Event.create({
      title,
      description,
      date,
      location,
      eventType,
      createdBy: req.user._id,
    });

    await User.findByIdAndUpdate(req.user._id, { $inc: { eventsCreated: 1 } });

    return res.status(201).json({
      success: true,
      message: 'Event created and sent for admin approval',
      event,
    });
  } catch (error) {
    return next(error);
  }
};

export const getEvents = async (req, res, next) => {
  try {
    const query =
      req.user && req.user.role === 'student'
        ? { approvedByAdmin: true }
        : req.user && req.user.role === 'alumni'
        ? { $or: [{ approvedByAdmin: true }, { createdBy: req.user._id }] }
        : {};

    const events = await Event.find(query)
      .populate('createdBy', 'name email role')
      .sort({ date: 1 });

    return res.json({ success: true, count: events.length, events });
  } catch (error) {
    return next(error);
  }
};

export const registerEvent = async (req, res, next) => {
  try {
    const { eventId } = req.body;

    if (!eventId) {
      res.status(400);
      throw new Error('eventId is required');
    }

    const event = await Event.findById(eventId);
    if (!event) {
      res.status(404);
      throw new Error('Event not found');
    }

    if (!event.approvedByAdmin) {
      res.status(400);
      throw new Error('Cannot register for unapproved event');
    }

    if (event.registeredStudents.some((id) => id.toString() === req.user._id.toString())) {
      res.status(409);
      throw new Error('Already registered for this event');
    }

    event.registeredStudents.push(req.user._id);
    await event.save();

    return res.status(201).json({
      success: true,
      message: 'Event registration successful',
      event,
    });
  } catch (error) {
    return next(error);
  }
};

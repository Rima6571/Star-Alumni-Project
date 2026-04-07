import Message from '../models/Message.js';
import User from '../models/User.js';

export const getConversations = async (req, res, next) => {
  try {
    const messages = await Message.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }],
    })
      .populate('sender', 'name email role branch profileImage')
      .populate('receiver', 'name email role branch profileImage')
      .sort({ timestamp: -1 });

    const map = new Map();

    for (const msg of messages) {
      const isSentByMe = msg.sender._id.toString() === req.user._id.toString();
      const otherUser = isSentByMe ? msg.receiver : msg.sender;
      const key = otherUser._id.toString();

      if (!map.has(key)) {
        map.set(key, {
          userId: otherUser._id,
          participant: otherUser.name,
          branch: otherUser.branch || '',
          profileImage: otherUser.profileImage || '',
          lastMessage: msg.message,
          lastTimestamp: msg.timestamp,
          unread: 0,
        });
      }

      if (!isSentByMe) {
        const current = map.get(key);
        current.unread += 1;
        map.set(key, current);
      }
    }

    const conversations = Array.from(map.values()).sort(
      (a, b) => new Date(b.lastTimestamp) - new Date(a.lastTimestamp),
    );

    return res.json({ success: true, count: conversations.length, conversations });
  } catch (error) {
    return next(error);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const { receiverId, message } = req.body;

    if (!receiverId || !message) {
      res.status(400);
      throw new Error('receiverId and message are required');
    }

    const receiver = await User.findById(receiverId);
    if (!receiver) {
      res.status(404);
      throw new Error('Receiver not found');
    }

    const newMessage = await Message.create({
      sender: req.user._id,
      receiver: receiverId,
      message,
      timestamp: new Date(),
    });

    return res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: newMessage,
    });
  } catch (error) {
    return next(error);
  }
};

export const getConversation = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id },
      ],
    })
      .populate('sender', 'name email role')
      .populate('receiver', 'name email role')
      .sort({ timestamp: 1 });

    return res.json({ success: true, count: messages.length, messages });
  } catch (error) {
    return next(error);
  }
};

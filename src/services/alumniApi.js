import api from './api';

export const alumniApi = {
  getProfile: () => api.get('/api/alumni/profile'),
  updateProfile: (payload) => api.put('/api/alumni/profile', payload),
  getImpact: () => api.get('/api/alumni/impact'),

  getStudents: (params) => api.get('/api/alumni/students', { params }),

  postJob: (payload) => api.post('/api/jobs', payload),
  getMyJobs: () => api.get('/api/alumni/jobs'),
  deleteMyJob: (id) => api.delete(`/api/alumni/jobs/${id}`),

  postEvent: (payload) => api.post('/api/events', payload),
  getMyEvents: () => api.get('/api/alumni/events'),
  deleteMyEvent: (id) => api.delete(`/api/alumni/events/${id}`),

  getMentorshipRequests: () => api.get('/api/mentorship/requests'),
  respondMentorshipRequest: (payload) => api.post('/api/mentorship/respond', payload),

  getMessages: () => api.get('/api/messages'),
  getConversation: (userId) => api.get(`/api/messages/${userId}`),
  sendMessage: (payload) => api.post('/api/messages/send', payload),
};


import axios from 'axios';
import { getToken } from '../utils/auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const studentApi = {
  getProfile: () => api.get('/api/students/profile'),
  updateProfile: (payload) => api.put('/api/students/profile', payload),
  getDashboard: () => api.get('/api/students/dashboard'),
  parseResume: (payload) => api.post('/api/students/resume/parse', payload),
  getApplications: () => api.get('/api/students/applications'),
  getMyEvents: () => api.get('/api/students/events'),
  getMentorshipRequests: () => api.get('/api/students/mentorship'),
};

export const alumniApi = {
  getAlumni: (params) => api.get('/api/alumni', { params }),
  getAlumniById: (id) => api.get(`/api/alumni/${id}`),
};

export const jobApi = {
  getJobs: () => api.get('/api/jobs'),
  applyJob: (payload) => api.post('/api/jobs/apply', payload),
};

export const eventApi = {
  getEvents: () => api.get('/api/events'),
  registerEvent: (payload) => api.post('/api/events/register', payload),
};

export const mentorshipApi = {
  requestMentorship: (payload) => api.post('/api/mentorship/request', payload),
  autoAssign: (payload) => api.post('/api/mentorship/auto-assign', payload),
};

export const messageApi = {
  getMessages: () => api.get('/api/messages'),
};

export default api;


import api from './api';

export const adminApi = {
  getDashboard: () => api.get('/api/admin/dashboard'),
  getAnalytics: () => api.get('/api/admin/analytics'),
  exportData: (format = 'json') =>
    api.get('/api/admin/export', {
      params: { format },
      responseType: format === 'csv' ? 'blob' : 'json',
    }),
  getReports: () => api.get('/api/admin/reports'),

  getStudents: () => api.get('/api/admin/students'),
  getAlumni: () => api.get('/api/admin/alumni'),
  deleteUser: (id) => api.delete(`/api/admin/user/${id}`),

  getJobs: (params) => api.get('/api/admin/jobs', { params }),
  approveJob: (id) => api.put(`/api/admin/jobs/approve/${id}`),
  rejectJob: (id) => api.put(`/api/admin/jobs/reject/${id}`),

  getEvents: (params) => api.get('/api/admin/events', { params }),
  approveEvent: (id) => api.put(`/api/admin/events/approve/${id}`),
  rejectEvent: (id) => api.put(`/api/admin/events/reject/${id}`),

  getProfile: () => api.get('/api/admin/profile'),
  updateProfile: (payload) => api.put('/api/admin/profile', payload),
  updatePassword: (payload) => api.put('/api/admin/password', payload),
};

export default adminApi;

export const authorize = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ success: false, message: 'Forbidden: insufficient permissions' });
  }
  return next();
};

export const adminOnly = authorize('admin');
export const alumniOnly = authorize('alumni');
export const studentOnly = authorize('student');

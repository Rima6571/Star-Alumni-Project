export const TOKEN_KEY = 'apcoer_token';
export const USER_KEY = 'apcoer_user';

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getCurrentUser = () => {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const getCurrentRole = () => getCurrentUser()?.role || null;

export const saveAuth = ({ token, user }) => {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const isAlumniUser = () => getCurrentRole() === 'alumni';
export const isStudentUser = () => getCurrentRole() === 'student';

export const hasRole = (roles = []) => {
  const role = getCurrentRole();
  return roles.includes(role);
};


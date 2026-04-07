import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useToast } from '../components/ToastProvider';
import { getCurrentRole, saveAuth } from '../utils/auth';

const getDashboardPath = (role) => {
  if (role === 'student') return '/student/dashboard';
  if (role === 'alumni') return '/alumni/dashboard';
  if (role === 'admin' || role === 'teacher') return '/admin';
  return '/';
};

const Login = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentRole = useMemo(() => getCurrentRole(), []);

  useEffect(() => {
    if (currentRole) {
      navigate(getDashboardPath(currentRole), { replace: true });
    }
  }, [currentRole, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      showToast('Email and password are required', 'error');
      return;
    }

    try {
      setIsSubmitting(true);
      const { data } = await api.post('/api/auth/login', {
        email: formData.email.trim(),
        password: formData.password,
      });

      saveAuth({ token: data.token, user: data.user });
      showToast('Login successful', 'success');
      navigate(getDashboardPath(data.user?.role), { replace: true });
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      showToast(message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-100 px-4 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(30,64,175,0.22),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(245,158,11,0.22),transparent_32%)]" />

      <div className="relative mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">APCOER Alumni Portal</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">Welcome Back</h1>
        <p className="mt-2 text-sm text-slate-600">Sign in to access your student, alumni, or admin dashboard.</p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-600">
          New here?{' '}
          <Link to="/register" className="font-semibold text-blue-700 hover:text-blue-800">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

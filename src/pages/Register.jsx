import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../services/api';
import { useToast } from '../components/ToastProvider';
import { getCurrentRole, saveAuth } from '../utils/auth';

const getDashboardPath = (role) => {
  if (role === 'student') return '/student/dashboard';
  if (role === 'alumni') return '/alumni/dashboard';
  if (role === 'admin' || role === 'teacher') return '/admin';
  return '/';
};

const getInitialRole = (roleFromQuery) => {
  if (roleFromQuery === 'alumni' || roleFromQuery === 'student') {
    return roleFromQuery;
  }
  return 'student';
};

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { showToast } = useToast();

  const roleFromQuery = searchParams.get('role');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: getInitialRole(roleFromQuery),
    branch: '',
    graduationYear: '',
    company: '',
    jobTitle: '',
    skills: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentRole = useMemo(() => getCurrentRole(), []);

  useEffect(() => {
    if (currentRole) {
      navigate(getDashboardPath(currentRole), { replace: true });
    }
  }, [currentRole, navigate]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, role: getInitialRole(roleFromQuery) }));
  }, [roleFromQuery]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      showToast('Name, email, and password are required', 'error');
      return;
    }

    if (formData.password.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role,
        branch: formData.branch.trim(),
        graduationYear: formData.graduationYear ? Number(formData.graduationYear) : undefined,
        company: formData.company.trim(),
        jobTitle: formData.jobTitle.trim(),
        skills: formData.skills
          .split(',')
          .map((skill) => skill.trim())
          .filter(Boolean),
      };

      const { data } = await api.post('/api/auth/register', payload);
      saveAuth({ token: data.token, user: data.user });

      showToast('Registration successful', 'success');
      navigate(getDashboardPath(data.user?.role), { replace: true });
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      showToast(message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-100 px-4 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(15,23,42,0.1),transparent_36%),radial-gradient(circle_at_85%_10%,rgba(30,64,175,0.16),transparent_30%),radial-gradient(circle_at_52%_100%,rgba(245,158,11,0.16),transparent_34%)]" />

      <div className="relative mx-auto w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-7 shadow-2xl sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">APCOER Alumni Portal</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">Create Account</h1>
        <p className="mt-2 text-sm text-slate-600">Register as student or alumni and start collaborating with the APCOER network.</p>

        <form onSubmit={handleSubmit} className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="role" className="mb-1.5 block text-sm font-medium text-slate-700">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
            >
              <option value="student">Student</option>
              <option value="alumni">Alumni</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
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
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-slate-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Repeat password"
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label htmlFor="branch" className="mb-1.5 block text-sm font-medium text-slate-700">
              Branch
            </label>
            <input
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              placeholder="Computer Engineering"
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label htmlFor="graduationYear" className="mb-1.5 block text-sm font-medium text-slate-700">
              Graduation Year
            </label>
            <input
              id="graduationYear"
              name="graduationYear"
              type="number"
              min="1990"
              max="2100"
              value={formData.graduationYear}
              onChange={handleChange}
              placeholder="2027"
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-slate-700">
              Company
            </label>
            <input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder={formData.role === 'alumni' ? 'Current company' : 'Optional'}
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label htmlFor="jobTitle" className="mb-1.5 block text-sm font-medium text-slate-700">
              Job Title
            </label>
            <input
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder={formData.role === 'alumni' ? 'Software Engineer' : 'Optional'}
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="skills" className="mb-1.5 block text-sm font-medium text-slate-700">
              Skills
            </label>
            <input
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="sm:col-span-2 w-full rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-blue-700 hover:text-blue-800">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

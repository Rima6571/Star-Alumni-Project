import React, { useEffect, useState } from 'react';
import { User, Lock, Bell, Camera, Eye, EyeOff, Save } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import adminApi from '../../services/adminApi';

/* ─── sub-components ────────────────────────────────────────── */
const SectionCard = ({ title, icon: Icon, children }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50/50">
      <div className="w-8 h-8 bg-[#1E40AF]/10 rounded-lg flex items-center justify-center">
        <Icon size={15} className="text-[#1E40AF]" />
      </div>
      <h3 className="text-sm font-semibold text-[#0F172A]">{title}</h3>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const Field = ({ label, children, required }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

const inputCls =
  'w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-xl ' +
  'focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20 focus:border-[#1E40AF] ' +
  'transition-all placeholder:text-gray-400';

/* ─── Settings ──────────────────────────────────────────────── */
const Settings = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);

  /* profile state */
  const [profile, setProfile] = useState({
    fullName: 'Dr. Anita Desai',
    email:    'admin@apcoer.edu.in',
    phone:    '+91 98765 43210',
    department: 'Computer Engineering',
    designation: 'Associate Professor',
    bio: 'Faculty member and alumni coordinator at APCOER since 2012.',
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await adminApi.getProfile();
        const p = data.profile || {};

        setProfile((prev) => ({
          ...prev,
          fullName: p.name || prev.fullName,
          email: p.email || prev.email,
          department: p.branch || prev.department,
          designation: p.jobTitle || prev.designation,
          bio: p.bio || prev.bio,
        }));
      } catch {
        toast('Unable to load profile details.', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [toast]);

  /* password state */
  const [passwords, setPasswords] = useState({ current: '', newPwd: '', confirm: '' });
  const [showPwd, setShowPwd] = useState({ current: false, newPwd: false, confirm: false });

  /* notifications state */
  const [notifs, setNotifs] = useState({
    newStudent:    true,
    newAlumni:     true,
    jobApproval:   true,
    eventApproval: true,
    emailDigest:   false,
    smsAlerts:     false,
  });

  const handleProfileSave = (e) => {
    e.preventDefault();
    const submit = async () => {
      try {
        await adminApi.updateProfile({
          name: profile.fullName,
          email: profile.email,
          branch: profile.department,
          jobTitle: profile.designation,
          bio: profile.bio,
        });
        toast('Profile updated successfully!', 'success');
      } catch {
        toast('Unable to update profile.', 'error');
      }
    };

    submit();
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    if (!passwords.current) {
      toast('Please enter your current password.', 'warning');
      return;
    }
    if (passwords.newPwd.length < 6) {
      toast('New password must be at least 6 characters.', 'warning');
      return;
    }
    if (passwords.newPwd !== passwords.confirm) {
      toast('New passwords do not match.', 'error');
      return;
    }
    const submit = async () => {
      try {
        await adminApi.updatePassword({
          currentPassword: passwords.current,
          newPassword: passwords.newPwd,
        });

        toast('Password changed successfully!', 'success');
        setPasswords({ current: '', newPwd: '', confirm: '' });
      } catch {
        toast('Unable to update password.', 'error');
      }
    };

    submit();
  };

  const toggleNotif = (key) => setNotifs((prev) => ({ ...prev, [key]: !prev[key] }));

  const Toggle = ({ checked, onChange }) => (
    <button
      type="button"
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none
        ${checked ? 'bg-[#1E40AF]' : 'bg-gray-200'}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200
          ${checked ? 'translate-x-5' : 'translate-x-0'}`}
      />
    </button>
  );

  const PwdInput = ({ field, placeholder }) => (
    <div className="relative">
      <input
        type={showPwd[field] ? 'text' : 'password'}
        value={passwords[field]}
        onChange={(e) => setPasswords((p) => ({ ...p, [field]: e.target.value }))}
        placeholder={placeholder}
        className={`${inputCls} pr-10`}
        autoComplete="new-password"
      />
      <button
        type="button"
        onClick={() => setShowPwd((p) => ({ ...p, [field]: !p[field] }))}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        {showPwd[field] ? <EyeOff size={15} /> : <Eye size={15} />}
      </button>
    </div>
  );

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-lg font-bold text-[#0F172A]">Settings</h2>
        <p className="text-sm text-gray-500 mt-0.5">Manage your account preferences</p>
      </div>

      {loading ? (
        <div className="h-28 rounded-2xl border border-gray-100 bg-white animate-pulse" />
      ) : null}

      {/* ── Profile Section ── */}
      <SectionCard title="Profile Information" icon={User}>
        <form onSubmit={handleProfileSave} className="space-y-5">
          {/* Avatar */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1E40AF] to-[#3b82f6] flex items-center justify-center text-white text-2xl font-bold">
                AD
              </div>
              <button
                type="button"
                className="absolute -bottom-1 -right-1 w-7 h-7 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-[#1E40AF] transition-colors shadow-sm"
              >
                <Camera size={12} />
              </button>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{profile.fullName}</p>
              <p className="text-xs text-gray-500">{profile.designation}</p>
              <p className="text-xs text-gray-400 mt-0.5">{profile.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full Name" required>
              <input
                className={inputCls}
                value={profile.fullName}
                onChange={(e) => setProfile((p) => ({ ...p, fullName: e.target.value }))}
                placeholder="Dr. Anita Desai"
              />
            </Field>
            <Field label="Email Address" required>
              <input
                type="email"
                className={inputCls}
                value={profile.email}
                onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
              />
            </Field>
            <Field label="Phone Number">
              <input
                className={inputCls}
                value={profile.phone}
                onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
              />
            </Field>
            <Field label="Department">
              <select
                className={inputCls}
                value={profile.department}
                onChange={(e) => setProfile((p) => ({ ...p, department: e.target.value }))}
              >
                {['Computer Engineering', 'Information Technology', 'Mechanical Engineering',
                  'Civil Engineering', 'Electronics Engineering'].map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </Field>
            <Field label="Designation">
              <input
                className={inputCls}
                value={profile.designation}
                onChange={(e) => setProfile((p) => ({ ...p, designation: e.target.value }))}
              />
            </Field>
          </div>

          <Field label="Bio">
            <textarea
              rows={3}
              className={`${inputCls} resize-none`}
              value={profile.bio}
              onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
              placeholder="A short bio about yourself…"
            />
          </Field>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#1E40AF] text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Save size={14} /> Save Changes
            </button>
          </div>
        </form>
      </SectionCard>

      {/* ── Password Section ── */}
      <SectionCard title="Change Password" icon={Lock}>
        <form onSubmit={handlePasswordSave} className="space-y-4">
          <Field label="Current Password" required>
            <PwdInput field="current" placeholder="Enter current password" />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="New Password" required>
              <PwdInput field="newPwd" placeholder="Min. 8 characters" />
            </Field>
            <Field label="Confirm New Password" required>
              <PwdInput field="confirm" placeholder="Repeat new password" />
            </Field>
          </div>

          {/* Password strength hint */}
          {passwords.newPwd && (
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map((n) => {
                const strength = [
                  passwords.newPwd.length >= 8,
                  /[A-Z]/.test(passwords.newPwd),
                  /[0-9]/.test(passwords.newPwd),
                  /[^A-Za-z0-9]/.test(passwords.newPwd),
                ];
                const active = strength.slice(0, n).every(Boolean);
                return (
                  <div key={n} className={`h-1 flex-1 rounded-full transition-colors
                    ${active ? (n <= 2 ? 'bg-amber-400' : n <= 3 ? 'bg-blue-400' : 'bg-emerald-500') : 'bg-gray-200'}`}
                  />
                );
              })}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#0F172A] text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
            >
              <Lock size={14} /> Update Password
            </button>
          </div>
        </form>
      </SectionCard>

      {/* ── Notifications Section ── */}
      <SectionCard title="Notification Preferences" icon={Bell}>
        <div className="space-y-4">
          {[
            { key: 'newStudent',    label: 'New student registrations',    desc: 'Get notified when a new student signs up' },
            { key: 'newAlumni',     label: 'New alumni registrations',     desc: 'Get notified when a new alumni joins' },
            { key: 'jobApproval',   label: 'Job post approval requests',   desc: 'Alert when a job needs your approval' },
            { key: 'eventApproval', label: 'Event approval requests',      desc: 'Alert when an event needs your approval' },
            { key: 'emailDigest',   label: 'Daily email digest',           desc: 'Receive a daily summary email' },
            { key: 'smsAlerts',     label: 'SMS alerts',                   desc: 'Receive important alerts via SMS' },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-start justify-between gap-4 py-3 border-b border-gray-50 last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-800">{label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
              </div>
              <Toggle checked={notifs[key]} onChange={() => toggleNotif(key)} />
            </div>
          ))}

          <div className="flex justify-end pt-2">
            <button
              onClick={() => toast('Notification preferences saved!', 'success')}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#1E40AF] text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Save size={14} /> Save Preferences
            </button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
};

export default Settings;

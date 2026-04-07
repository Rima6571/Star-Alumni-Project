import { useState } from 'react';
import FormInput from '../../components/FormInput';
import { useToast } from '../../components/ToastProvider';

const Settings = () => {
  const { showToast } = useToast();
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });
  const [preferences, setPreferences] = useState({
    jobs: true,
    events: true,
    mentorship: true,
    messages: true,
  });

  const updatePassword = (event) => {
    event.preventDefault();
    if (!passwords.current || !passwords.next || !passwords.confirm) {
      showToast('Please fill all password fields', 'error');
      return;
    }

    if (passwords.next !== passwords.confirm) {
      showToast('New password and confirm password must match', 'error');
      return;
    }

    setPasswords({ current: '', next: '', confirm: '' });
    showToast('Password updated successfully', 'success');
  };

  return (
    <section className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-600 mt-1">Manage password, profile preferences, and notifications.</p>
      </div>

      <form onSubmit={updatePassword} className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 md:p-6 space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Change Password</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <FormInput label="Current Password" type="password" value={passwords.current} onChange={(e) => setPasswords((prev) => ({ ...prev, current: e.target.value }))} />
          <div />
          <FormInput label="New Password" type="password" value={passwords.next} onChange={(e) => setPasswords((prev) => ({ ...prev, next: e.target.value }))} />
          <FormInput label="Confirm New Password" type="password" value={passwords.confirm} onChange={(e) => setPasswords((prev) => ({ ...prev, confirm: e.target.value }))} />
        </div>
        <button type="submit" className="px-5 py-2.5 rounded-xl bg-college-blue text-white font-semibold hover:bg-blue-800">Update Password</button>
      </form>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 md:p-6 space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Notification Preferences</h2>
        {Object.entries(preferences).map(([key, value]) => (
          <label key={key} className="flex items-center justify-between border border-slate-100 rounded-xl px-4 py-3">
            <span className="text-sm text-slate-700 capitalize">{key} notifications</span>
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => setPreferences((prev) => ({ ...prev, [key]: e.target.checked }))}
              className="h-4 w-4 accent-college-blue"
            />
          </label>
        ))}
        <button
          onClick={() => showToast('Notification preferences saved', 'success')}
          className="px-5 py-2.5 rounded-xl bg-secondary text-white font-semibold hover:bg-slate-800"
        >
          Save Preferences
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 md:p-6">
        <h2 className="text-lg font-semibold text-slate-900">Update Profile</h2>
        <p className="text-sm text-slate-600 mt-1">For profile details, visit the My Profile page.</p>
      </div>
    </section>
  );
};

export default Settings;


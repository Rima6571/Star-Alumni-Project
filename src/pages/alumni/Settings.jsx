import { useState } from 'react';
import FormInput from '../../components/FormInput';
import { useToast } from '../../components/ToastProvider';

const Settings = () => {
  const { pushToast } = useToast();
  const [passwordState, setPasswordState] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState({
    mentorship: true,
    jobs: true,
    messages: true,
    events: false,
  });

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswordState((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    if (passwordState.newPassword !== passwordState.confirmPassword) {
      pushToast('New password and confirm password must match.', 'error');
      return;
    }

    pushToast('Password updated successfully.', 'success');
    setPasswordState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleNotificationChange = (event) => {
    const { name, checked } = event.target;
    setNotifications((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <section className="space-y-6">
      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Account Settings</h2>
        <p className="mt-1 text-sm text-slate-600">Manage password, profile preferences, and notification options.</p>
      </article>

      <form onSubmit={handlePasswordSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">Change Password</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <FormInput
            label="Current Password"
            name="currentPassword"
            type="password"
            value={passwordState.currentPassword}
            onChange={handlePasswordChange}
            required
          />
          <FormInput
            label="New Password"
            name="newPassword"
            type="password"
            value={passwordState.newPassword}
            onChange={handlePasswordChange}
            required
          />
          <div className="md:col-span-2">
            <FormInput
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              value={passwordState.confirmPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="mt-5 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800">
          Update Password
        </button>
      </form>

      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Notification Preferences</h3>
        <div className="mt-4 space-y-3">
          {[
            { key: 'mentorship', label: 'Mentorship requests' },
            { key: 'jobs', label: 'Job post updates' },
            { key: 'messages', label: 'New messages' },
            { key: 'events', label: 'Event status updates' },
          ].map((item) => (
            <label key={item.key} className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3">
              <span className="text-sm text-slate-700">{item.label}</span>
              <input
                type="checkbox"
                name={item.key}
                checked={notifications[item.key]}
                onChange={handleNotificationChange}
                className="h-4 w-4 rounded border-slate-300 text-blue-700 focus:ring-blue-600"
              />
            </label>
          ))}
        </div>

        <button
          type="button"
          onClick={() => pushToast('Notification preferences saved.', 'success')}
          className="mt-5 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
        >
          Save Preferences
        </button>
      </article>
    </section>
  );
};

export default Settings;

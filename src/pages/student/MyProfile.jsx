import { useEffect, useState } from 'react';
import ProfileCard from '../../components/ProfileCard';
import FormInput from '../../components/FormInput';
import LoadingState from '../../components/LoadingState';
import { studentProfile as fallbackProfile } from '../../data/studentMockData';
import { studentApi } from '../../services/api';
import { useToast } from '../../components/ToastProvider';

const extractProfile = (response, fallback) => {
  const data = response?.data;
  if (data?.profile) return data.profile;
  if (data?.data) return data.data;
  if (data && typeof data === 'object') return data;
  return fallback;
};

const mapProfileForUi = (profile) => ({
  ...profile,
  id: profile._id || profile.id,
  avatar: profile.avatar || profile.profileImage || 'https://i.pravatar.cc/120?img=47',
  location: profile.location || 'India',
  company: profile.company || 'Student',
  jobTitle: profile.jobTitle || 'Undergraduate',
  skills: Array.isArray(profile.skills) ? profile.skills : [],
  projects: Array.isArray(profile.projects) ? profile.projects : [],
});

const MyProfile = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    skills: '',
    projects: '',
    linkedin: '',
    github: '',
    resume: '',
    bio: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await studentApi.getProfile();
        const data = mapProfileForUi(extractProfile(response, fallbackProfile));
        setProfile(data);
        setForm({
          skills: (data.skills || []).join(', '),
          projects: (data.projects || []).join(', '),
          linkedin: data.linkedin || '',
          github: data.github || '',
          resume: data.resume || '',
          bio: data.bio || '',
        });
      } catch {
        setProfile(fallbackProfile);
        setForm({
          skills: fallbackProfile.skills.join(', '),
          projects: fallbackProfile.projects.join(', '),
          linkedin: fallbackProfile.linkedin,
          github: fallbackProfile.github,
          resume: fallbackProfile.resume,
          bio: fallbackProfile.bio,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      skills: form.skills.split(',').map((item) => item.trim()).filter(Boolean),
      linkedin: form.linkedin,
      github: form.github,
      bio: form.bio,
    };

    try {
      const response = await studentApi.updateProfile(payload);
      const updated = mapProfileForUi(extractProfile(response, { ...profile, ...payload }));
      setProfile(updated);
      showToast('Profile updated successfully', 'success');
    } catch {
      setProfile((prev) => mapProfileForUi({ ...prev, ...payload }));
      showToast('Profile saved locally (API unavailable)', 'info');
    }
  };

  if (loading || !profile) return <LoadingState label="Loading profile..." />;

  return (
    <section className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
        <p className="text-sm text-slate-600 mt-1">Keep your profile updated to improve alumni discovery and mentorship matches.</p>
      </div>

      <ProfileCard profile={profile} />

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6 space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Edit Profile</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <FormInput label="Skills (comma separated)" value={form.skills} onChange={(e) => setForm((prev) => ({ ...prev, skills: e.target.value }))} />
          <FormInput label="Projects (comma separated)" value={form.projects} onChange={(e) => setForm((prev) => ({ ...prev, projects: e.target.value }))} />
          <FormInput label="LinkedIn" value={form.linkedin} onChange={(e) => setForm((prev) => ({ ...prev, linkedin: e.target.value }))} />
          <FormInput label="GitHub" value={form.github} onChange={(e) => setForm((prev) => ({ ...prev, github: e.target.value }))} />
          <FormInput label="Resume URL" value={form.resume} onChange={(e) => setForm((prev) => ({ ...prev, resume: e.target.value }))} />
        </div>
        <FormInput
          label="Bio"
          textarea
          value={form.bio}
          onChange={(e) => setForm((prev) => ({ ...prev, bio: e.target.value }))}
        />

        <div className="flex justify-end">
          <button type="submit" className="px-5 py-2.5 rounded-xl bg-college-blue text-white font-semibold hover:bg-blue-800">Save Changes</button>
        </div>
      </form>
    </section>
  );
};

export default MyProfile;


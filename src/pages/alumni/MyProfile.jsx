import { useEffect, useState } from 'react';
import FormInput from '../../components/FormInput';
import LoadingState from '../../components/LoadingState';
import ProfileCard from '../../components/ProfileCard';
import { useToast } from '../../components/ToastProvider';
import { alumniApi } from '../../services/alumniApi';
import { getToken, saveAuth } from '../../utils/auth';
import { mockProfile } from './mockData';

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
  avatar: profile.profileImage || profile.avatar || 'https://i.pravatar.cc/120?img=22',
  location: profile.location || 'India',
  skills: Array.isArray(profile.skills) ? profile.skills : [],
});

const MyProfile = () => {
  const { pushToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(mockProfile);
  const [formState, setFormState] = useState({
    company: '',
    jobTitle: '',
    linkedin: '',
    skills: '',
    experience: '',
    bio: '',
  });

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        const response = await alumniApi.getProfile();
        const payload = mapProfileForUi(extractProfile(response, mockProfile));
        setProfile(payload);
        setFormState({
          company: payload.company || '',
          jobTitle: payload.jobTitle || '',
          linkedin: payload.linkedin || '',
          skills: (payload.skills || []).join(', '),
          experience: payload.experience || '',
          bio: payload.bio || '',
        });
      } catch {
        setProfile(mockProfile);
        setFormState({
          company: mockProfile.company,
          jobTitle: mockProfile.jobTitle,
          linkedin: mockProfile.linkedin,
          skills: mockProfile.skills.join(', '),
          experience: mockProfile.experience,
          bio: mockProfile.bio,
        });
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      ...formState,
      skills: formState.skills
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean),
    };

    try {
      const response = await alumniApi.updateProfile(payload);
      const updatedProfile = mapProfileForUi(extractProfile(response, { ...profile, ...payload }));
      setProfile(updatedProfile);
      saveAuth({ token: getToken(), user: updatedProfile });
      pushToast('Profile updated successfully.', 'success');
    } catch {
      pushToast('API unavailable. Profile updated locally for demo.', 'info');
      setProfile((prev) => ({ ...prev, ...payload }));
    }
  };

  if (loading) return <LoadingState label="Loading profile..." />;

  return (
    <section className="space-y-6">
      <ProfileCard profile={profile} />

      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">Edit Profile</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <FormInput label="Company" name="company" value={formState.company} onChange={handleChange} required />
          <FormInput label="Job Title" name="jobTitle" value={formState.jobTitle} onChange={handleChange} required />
          <FormInput label="LinkedIn" name="linkedin" value={formState.linkedin} onChange={handleChange} />
          <FormInput label="Skills (comma separated)" name="skills" value={formState.skills} onChange={handleChange} />
          <FormInput
            label="Experience"
            name="experience"
            value={formState.experience}
            onChange={handleChange}
            textarea
          />
          <FormInput label="Bio" name="bio" value={formState.bio} onChange={handleChange} textarea />
        </div>

        <button
          type="submit"
          className="mt-5 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800"
        >
          Save Profile
        </button>
      </form>
    </section>
  );
};

export default MyProfile;

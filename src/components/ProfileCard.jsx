import { FiBriefcase, FiCalendar, FiCode, FiMapPin } from 'react-icons/fi';

const ProfileCard = ({ profile }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6">
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        <img src={profile.avatar} alt={profile.name} className="h-20 w-20 rounded-2xl object-cover" />
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-slate-900">{profile.name}</h2>
          <p className="text-sm text-slate-600 mt-1">{profile.jobTitle} at {profile.company}</p>
          <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm text-slate-600">
            <div className="flex items-center gap-2"><FiBriefcase /> {profile.branch}</div>
            <div className="flex items-center gap-2"><FiCalendar /> Class of {profile.graduationYear}</div>
            <div className="flex items-center gap-2"><FiMapPin /> {profile.location}</div>
            <div className="flex items-center gap-2"><FiCode /> {profile.skills.length} skills listed</div>
          </div>
          <p className="mt-4 text-sm text-slate-700">{profile.bio}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <span key={skill} className="px-3 py-1 rounded-full bg-blue-50 text-college-blue text-xs font-semibold">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;


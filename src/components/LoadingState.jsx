const LoadingState = ({ label = 'Loading...' }) => {
  return (
    <div className="py-14 flex flex-col items-center justify-center">
      <div className="h-10 w-10 rounded-full border-4 border-college-blue/20 border-t-college-blue animate-spin" />
      <p className="mt-3 text-sm text-slate-500">{label}</p>
    </div>
  );
};

export default LoadingState;


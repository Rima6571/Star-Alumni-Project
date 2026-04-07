import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-light-bg px-4 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(30,64,175,0.18),transparent_38%),radial-gradient(circle_at_85%_0%,rgba(245,158,11,0.22),transparent_34%),linear-gradient(180deg,#F8FAFC_0%,#EEF2FF_100%)]" />

      <div className="pointer-events-none absolute -left-16 top-24 h-36 w-36 rounded-full bg-college-blue/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-12 bottom-24 h-40 w-40 rounded-full bg-accent-gold/20 blur-3xl" />

      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-2xl backdrop-blur-sm md:p-12">
        <div className="absolute -right-16 -top-14 h-40 w-40 rounded-full border-[24px] border-college-blue/10" />
        <div className="absolute -bottom-20 -left-16 h-44 w-44 rounded-full border-[26px] border-accent-gold/15" />

        <p className="inline-flex rounded-full border border-college-blue/20 bg-college-blue/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-college-blue">
          APCOER Alumni Portal
        </p>

        <div className="mt-6 flex flex-wrap items-baseline gap-4">
          <span className="text-7xl font-black leading-none text-gradient md:text-8xl">404</span>
          <span className="rounded-xl bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">Page Missing</span>
        </div>

        <h1 className="mt-4 max-w-xl text-3xl font-bold leading-tight text-dark-blue md:text-4xl">
          This page took a different career path.
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
          The link may be outdated, or the page may have been moved. Head back to the homepage or continue to
          the login screen to access your student or alumni dashboard.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-college-blue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-college-blue/30 transition hover:-translate-y-0.5 hover:bg-blue-800"
          >
            Back to Home
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-college-blue hover:text-college-blue"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;

import { ApiStatus } from "@/components/api-status";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <div className="mb-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-teal-800">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-600" />
            Milestone 1
          </div>
          <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Autonomous Shadow IT Tracker
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
            A defensive foundation for authorised external attack surface
            monitoring.
          </p>
        </div>

        <div aria-label="Service status">
          <div className="flex items-center justify-between gap-6 border-t border-slate-200 py-5">
            <div>
              <p className="font-medium text-slate-950">Frontend</p>
              <p className="mt-1 text-sm text-slate-500">Next.js application</p>
            </div>
            <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
              <span className="h-2.5 w-2.5 rounded-full bg-teal-500" />
              Ready
            </div>
          </div>
          <ApiStatus />
        </div>

        <p className="mt-6 text-xs leading-5 text-slate-400">
          Local architecture check only. Scanning and analysis systems are not
          part of this milestone.
        </p>
      </section>
    </main>
  );
}

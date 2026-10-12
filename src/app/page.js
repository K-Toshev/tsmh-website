import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <section className="grid gap-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-10 text-white md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-indigo-100">Student organization</p>
            <h1 className="text-4xl font-bold">Welcome to the club hub</h1>
            <p className="mt-4 max-w-xl text-indigo-100">
              A community space for events, resources, leadership, and campus engagement.
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold">Quick links</h2>
            <ul className="mt-4 space-y-3 text-sm text-indigo-50">
              <li>• View upcoming events</li>
              <li>• Explore shared resources</li>
              <li>• Meet the team</li>
              <li>• Access admin tools</li>
            </ul>
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          <article className="card">
            <h2 className="text-xl font-semibold">Events</h2>
            <p className="mt-3 text-slate-600">Public event calendar with workshops, socials, and meetings.</p>
          </article>
          <article className="card">
            <h2 className="text-xl font-semibold">Resources</h2>
            <p className="mt-3 text-slate-600">Shared documents, study tools, and organizational guides.</p>
          </article>
          <article className="card">
            <h2 className="text-xl font-semibold">Leadership</h2>
            <p className="mt-3 text-slate-600">Meet the students helping drive the mission forward.</p>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}

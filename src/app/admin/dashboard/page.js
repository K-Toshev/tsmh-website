import Header from '@/components/Header';
import Footer from '@/components/Footer';

const upcoming = [
  'Welcome social on Friday',
  'Volunteer fair prep meeting',
  'Funding workshop',
];

export default function AdminDashboardPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-indigo-500">Admin dashboard</p>
            <h1 className="mt-2 text-3xl font-bold">Manage events</h1>
          </div>
          <button className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white">New event</button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="card">
            <h2 className="text-xl font-semibold">Upcoming items</h2>
            <ul className="mt-4 space-y-3 text-slate-700">
              {upcoming.map((item) => (
                <li key={item} className="rounded-lg bg-slate-100 p-3">{item}</li>
              ))}
            </ul>
          </section>

          <section className="card">
            <h2 className="text-xl font-semibold">Quick actions</h2>
            <div className="mt-4 space-y-3">
              <button className="block w-full rounded-lg border border-slate-300 px-4 py-3 text-left">Edit calendar</button>
              <button className="block w-full rounded-lg border border-slate-300 px-4 py-3 text-left">Upload resource</button>
              <button className="block w-full rounded-lg border border-slate-300 px-4 py-3 text-left">Update team listing</button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

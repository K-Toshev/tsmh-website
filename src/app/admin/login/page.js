import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AdminLoginPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-md px-6 py-16">
        <div className="card">
          <p className="text-sm uppercase tracking-[0.2em] text-indigo-500">Admin access</p>
          <h1 className="mt-2 text-3xl font-bold">Login</h1>

          <form className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <input type="email" className="w-full rounded-lg border border-slate-300 p-3" placeholder="admin@club.edu" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <input type="password" className="w-full rounded-lg border border-slate-300 p-3" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white">
              Sign in
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

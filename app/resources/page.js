const teamMembers = [
  { name: 'Maya Reynold', role: 'President', bio: 'Studies early modern warfare and public history.' },
  { name: 'Ethan Cole', role: 'Programming Lead', bio: 'Focuses on digital archives and historical maps.' },
  { name: 'Sofia Alvarez', role: 'Events Coordinator', bio: 'Leads community programming and member workshops.' }
];

export default function ResourcesPage() {
  return (
    <main className="section-shell space-y-10">
      <section className="card">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-700">About us</p>
        <h1 className="mt-3 text-4xl font-bold text-brand-900">A community for thoughtful military history</h1>
        <p className="mt-4 max-w-3xl text-stone-700">
          The Thucydides Society for Military History is a student-led organization devoted to serious study of warfare and strategy.
          We bring together scholars, historians, and curious students to pursue better understanding of conflict through historical inquiry.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="card">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Learning</p>
          <h2 className="mt-3 text-2xl font-bold text-brand-900">Programs that challenge how we think about war</h2>
          <ul className="mt-5 space-y-4 text-stone-700">
            <li>• Monthly reading groups focused on key campaigns, doctrines, and primary sources.</li>
            <li>• Speaker series featuring scholars, veterans, and students of military history.</li>
            <li>• Collaborative research workshops on archives, maps, and historiography.</li>
          </ul>
        </article>

        <article className="card">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Contact us</p>
          <h2 className="mt-3 text-2xl font-bold text-brand-900">Stay connected</h2>
          <div className="mt-5 space-y-3 text-stone-700">
            <p>Email: contact@thucydidessociety.org</p>
            <p>Instagram: @thucydidessociety</p>
            <p>Office hours: Thursdays, 4:00–6:00 PM</p>
          </div>
        </article>
      </section>

      <section className="card">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Team members</p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {teamMembers.map((member) => (
            <div key={member.name} className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-800 text-lg font-bold text-white">
                {member.name.split(' ').map((piece) => piece[0]).join('')}
              </div>
              <h3 className="text-xl font-bold text-brand-900">{member.name}</h3>
              <p className="mt-1 text-sm font-medium uppercase tracking-[0.15em] text-brand-700">{member.role}</p>
              <p className="mt-3 text-stone-700">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TeamMemberCard from '@/components/TeamMemberCard';

const team = [
  { name: 'Ava Patel', role: 'President', bio: 'Coordinates club direction and partnerships.' },
  { name: 'Marcus Chen', role: 'Events Lead', bio: 'Plans workshops, socials, and member engagement.' },
  { name: 'Lina Morales', role: 'Communications', bio: 'Manages outreach, updates, and messaging.' },
];

export default function TeamPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-indigo-500">Team</p>
          <h1 className="mt-2 text-3xl font-bold">Meet the leadership team</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {team.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

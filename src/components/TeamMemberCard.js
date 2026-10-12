export default function TeamMemberCard({ member }) {
  return (
    <article className="card text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-700">
        {member.name
          .split(' ')
          .map((part) => part[0])
          .slice(0, 2)
          .join('')}
      </div>
      <h2 className="mt-4 text-xl font-semibold">{member.name}</h2>
      <p className="mt-1 text-sm font-medium text-indigo-600">{member.role}</p>
      <p className="mt-3 text-slate-600">{member.bio}</p>
    </article>
  );
}

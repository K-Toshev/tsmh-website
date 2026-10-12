export default function TeamCard({ member }) {
  const initials = member.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <article className="bg-surface border border-line rounded-lg p-5 flex gap-4">
      {member.photo ? (
        <img src={member.photo} alt={member.name} className="h-16 w-16 rounded-full object-cover shrink-0" />
      ) : (
        <div
          aria-hidden="true"
          className="h-16 w-16 rounded-full bg-accent text-white grid place-items-center text-lg font-semibold shrink-0"
        >
          {initials}
        </div>
      )}
      <div>
        <h2 className="font-semibold">{member.name}</h2>
        <p className="text-sm text-accent font-medium">{member.role}</p>
        <p className="text-sm text-muted mt-2">{member.bio}</p>
        {member.email && (
          <a href={`mailto:${member.email}`} className="text-sm underline mt-2 inline-block hover:text-accent">
            {member.email}
          </a>
        )}
      </div>
    </article>
  );
}

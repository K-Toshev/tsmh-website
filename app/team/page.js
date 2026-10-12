import TeamCard from "@/components/TeamCard";
import { team } from "@/data/team";

export const metadata = { title: "Team" };

export default function TeamPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Meet the team</h1>
      <p className="text-muted mt-2 max-w-2xl">Placeholder: a sentence about how officers are chosen and how to reach them.</p>
      <div className="grid gap-4 sm:grid-cols-2 mt-8">
        {team.map((m, i) => (
          <TeamCard key={`${m.role}-${i}`} member={m} />
        ))}
      </div>
    </div>
  );
}

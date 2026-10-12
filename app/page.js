import Link from "next/link";
import { site } from "@/data/site";

export default function HomePage() {
  return (
    <div className="space-y-14">
      <section className="py-8">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight max-w-3xl">{site.name}</h1>
        <p className="mt-4 text-lg text-muted max-w-2xl">{site.tagline}</p>
        <p className="mt-2 text-sm text-muted">{site.meeting}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/calendar" className="bg-accent text-white text-sm font-medium px-5 py-2.5 rounded-md hover:bg-accent-dark">
            See upcoming events
          </Link>
          <Link href="/resources" className="border border-line bg-surface text-sm font-medium px-5 py-2.5 rounded-md hover:border-accent">
            Browse resources
          </Link>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-3">
        {site.pillars.map((p) => (
          <div key={p.title} className="border-t-2 border-accent pt-4">
            <h2 className="font-semibold">{p.title}</h2>
            <p className="text-sm text-muted mt-2">{p.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

import { resources } from "@/data/resources";

export const metadata = { title: "Resources" };

export default function ResourcesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
      <p className="text-muted mt-2 max-w-2xl">We have curated the following list for your reference.</p>

      <div className="mt-8 space-y-10">
        {resources.map((group) => (
          <section key={group.category}>
            <h2 className="text-xl font-semibold mb-3">{group.category}</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {group.items.map((item) => (
                <li key={item.title}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full bg-surface border border-line rounded-lg p-4 hover:border-accent"
                  >
                    <span className="font-medium">{item.title}</span>
                    <span className="block text-sm text-muted mt-1">{item.description}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

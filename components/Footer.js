import Link from "next/link";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface mt-10">
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-4 sm:flex-row sm:justify-between text-sm text-muted">
        <div>
          <p className="font-semibold text-ink">{site.name}</p>
          <p>{site.university}</p>
          <a href={`mailto:${site.contactEmail}`} className="hover:text-accent">
            {site.contactEmail}
          </a>
        </div>
        <ul className="flex gap-4 items-start">
          {site.social.map((s) => (
            <li key={s.label}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <Link href="/login" className="hover:text-accent">
              Admin login
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

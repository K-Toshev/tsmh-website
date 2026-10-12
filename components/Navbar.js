import Link from "next/link";
import { site } from "@/data/site";

const links = [
  { href: "/calendar", label: "Calendar" },
  { href: "/resources", label: "Resources" },
  { href: "/team", label: "Team" },
];

export default function Navbar() {
  return (
    <header className="bg-surface border-b border-line">
      <nav className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
        <Link href="/" className="text-lg font-bold tracking-tight">
          {site.shortName}
        </Link>
        <ul className="flex gap-6 text-sm font-medium">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-muted hover:text-accent">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

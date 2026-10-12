const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Calendar', href: '/calendar' },
  { label: 'Resources', href: '/resources' },
  { label: 'Team', href: '/team' },
  { label: 'Admin', href: '/admin/login' },
];

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="text-xl font-bold tracking-tight text-slate-900">
          Student Org Hub
        </a>
        <nav className="hidden gap-6 text-sm font-medium text-slate-600 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-indigo-600">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

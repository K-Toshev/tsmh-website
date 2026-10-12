import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/calendar', label: 'Calendar' },
  { href: '/resources', label: 'Resources' },
  { href: '/admin', label: 'Admin' }
];

export default function Navigation() {
  return (
    <header className="border-b border-brand-700 bg-brand-900 text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="logo-mark">TSMH</div>
          <div>
            <p className="text-lg font-semibold tracking-wide">Thucydides Society</p>
            <p className="text-xs uppercase tracking-[0.2em] text-stone-300">Military History</p>
          </div>
        </Link>

        <div className="hidden gap-6 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-stone-200 transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

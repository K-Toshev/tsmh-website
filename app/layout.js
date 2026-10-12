import './globals.css';
import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'Thucydides Society for Military History',
  description: 'Student organization dedicated to military history scholarship and public engagement.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-stone-100 text-stone-900">
          <Navigation />
          {children}
        </div>
      </body>
    </html>
  );
}

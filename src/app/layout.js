import './globals.css';

export const metadata = {
  title: 'Student Org Hub',
  description: 'Student organization website scaffold',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import "./globals.css";
import { Figtree } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site } from "@/data/site";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" });

export const metadata = {
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.tagline,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} font-sans min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

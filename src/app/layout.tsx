import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainNav } from "@/components/MainNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HubHub | Command Center",
  description: "Central management for all your project hubs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <div className="fixed inset-0 bg-[#0a0c10] -z-10" />
        <div className="fixed inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-emerald-500/5 -z-10" />

        <header className="sticky top-0 z-50 p-4">
          <MainNav />
        </header>

        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        <footer className="p-8 text-center text-white/20 text-sm">
          HubHub v0.1.0 &copy; {new Date().getFullYear()}
        </footer>
      </body>
    </html>
  );
}

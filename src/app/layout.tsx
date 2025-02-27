import type { Metadata } from "next";
import "./globals.css"; // Import global styles

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "A personal portfolio and blog website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <header className="p-4 bg-blue-600 text-white text-left text-2xl">
          <a href="/">
            Sumukh Bhat
          </a>
        </header>
        <main className="min-h-screen">{children}</main>
        <footer className="p-4 bg-gray-800 text-white text-center">
          © 2025 - sumukhb.in
        </footer>
      </body>
    </html>
  );
}
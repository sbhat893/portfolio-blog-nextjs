import type { Metadata } from "next";
import "./globals.css"; // Import global styles
import { ReactNode } from "react";
import { PortfolioProvider } from "@/context/PortfolioContext";

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "A personal portfolio and blog website",
};

const fetchPortfolioData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/portfolio`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch portfolio data");
  }
  return res.json();
};

const Layout = async ({ children }: { children: ReactNode }) => {

  const data = await fetchPortfolioData();

  if(data.name == null) {
    data.name = "Sumukh Bhat"
  }
  return (
    <PortfolioProvider initialData={data}>
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <header className="p-4 bg-blue-600 text-white text-left text-2xl">
          <a href="/">
            {data.name}
          </a>
        </header>
        
        <main className="min-h-screen">{children}</main>
        
        <footer className="p-4 bg-gray-800 text-white text-center">
          © 2025 - sumukhb.in
        </footer>
      </body>
    </html>
    </PortfolioProvider>
  );
}

export default Layout;
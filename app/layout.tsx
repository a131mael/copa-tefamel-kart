import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Copa Tefamel de Kart",
  description: "Campeonato de kart — classificação, etapas e muito mais.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-[#111114] text-white antialiased">
        <Navbar />
        <main>{children}</main>
        <footer className="border-t border-[#3A3A45] mt-20 py-8 text-center text-[#9CA3AF] text-sm">
          <p>
            Copa Tefamel de Kart · Palhoça, SC ·{" "}
            <a
              href="https://www.instagram.com/copatefameldekart/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F2C200] hover:underline"
            >
              @copatefameldekart
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}

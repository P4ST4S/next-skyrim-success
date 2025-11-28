import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Suivi des Succès Skyrim",
  description: "Suivez vos succès dans le monde de Skyrim",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${cinzel.variable} ${inter.variable} antialiased bg-[#1a1a1a] text-[#c0c0c0]`}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jelajahi Indonesia — Digital Indonesia",
  description:
    "Setiap kota punya cerita. Temukan keindahan, budaya, dan sejarah 38 provinsi Indonesia melalui peta interaktif kami.",
  keywords: [
    "Indonesia",
    "peta interaktif",
    "provinsi",
    "eksplorasi",
    "budaya",
    "pariwisata",
  ],
  openGraph: {
    title: "Jelajahi Indonesia — Digital Indonesia",
    description:
      "Setiap kota punya cerita. Temukan ceritanya di sini.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable}`}>
      <body className="min-h-screen antialiased bg-[#F4F1EA] text-[#2C1E16]">
        {/* Skip navigation untuk aksesibilitas */}
        <a
          href="#beranda"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
          style={{
            background: "#C15B3D",
            color: "#ffffff",
          }}
        >
          Langsung ke konten utama
        </a>
        {children}
      </body>
    </html>
  );
}

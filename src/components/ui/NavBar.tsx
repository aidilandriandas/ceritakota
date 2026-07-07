"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Globe, MapPin } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [lang, setLang] = useState<"ID" | "EN">("ID");

  return (
    <motion.nav
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl"
    >
      <div
        className="flex items-center justify-between px-6 py-3 rounded-2xl border border-[#2C1E16]/10"
        style={{
          background: "rgba(244, 241, 234, 0.8)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow:
            "0 8px 32px rgba(44, 30, 22, 0.05)",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 12 }}
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #C15B3D, #A43820)",
              boxShadow: "0 0 15px rgba(193, 91, 61, 0.2)",
            }}
          >
            <MapPin className="w-5 h-5 text-white" />
          </motion.div>
          <span className="text-lg font-bold text-[#2C1E16] tracking-tight">
            Nusantara<span className="text-[#C15B3D]">Digital</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`relative px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                  pathname === link.href || (pathname !== "/" && link.href !== "/" && pathname.startsWith(link.href))
                    ? "text-[#C15B3D]"
                    : "text-[#2C1E16]/70 hover:text-[#2C1E16]"
                }`}
              >
                {(pathname === link.href || (pathname !== "/" && link.href !== "/" && pathname.startsWith(link.href))) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: "rgba(193, 91, 61, 0.1)",
                      border: "1px solid rgba(193, 91, 61, 0.2)",
                    }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Cari"
            className="p-2.5 rounded-xl text-[#2C1E16]/70 hover:text-[#2C1E16] hover:bg-[#2C1E16]/5 transition-all duration-300"
          >
            <Search className="w-4 h-4" />
          </motion.button>

          {/* Language Switcher */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLang(lang === "ID" ? "EN" : "ID")}
            aria-label="Ganti bahasa"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold text-[#2C1E16]/70 hover:text-[#2C1E16] hover:bg-[#2C1E16]/5 transition-all duration-300"
          >
            <Globe className="w-4 h-4" />
            <span>{lang}</span>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}

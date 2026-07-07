"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  label?: string;
  fallbackHref?: string;
}

export default function BackButton({ label = "Kembali", fallbackHref = "/" }: BackButtonProps) {
  const router = useRouter();

  return (
    <motion.button
      whileHover={{ scale: 1.05, x: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        if (window.history.length > 2) {
          router.back();
        } else {
          router.push(fallbackHref);
        }
      }}
      className="flex items-center gap-2 px-4 py-2 rounded-xl text-[#2C1E16]/70 hover:text-[#2C1E16] transition-colors font-bold"
      style={{
        background: "rgba(255, 255, 255, 0.8)",
        border: "1px solid rgba(44, 30, 22, 0.1)",
        boxShadow: "0 2px 10px rgba(44, 30, 22, 0.05)",
      }}
    >
      <ArrowLeft className="w-4 h-4" />
      <span className="text-sm font-medium">{label}</span>
    </motion.button>
  );
}

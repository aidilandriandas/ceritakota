"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface InfoCardProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  delay?: number;
}

export default function InfoCard({ icon, title, children, delay = 0 }: InfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="p-6 rounded-2xl relative overflow-hidden group"
      style={{
        background: "#ffffff",
        border: "1px solid rgba(44, 30, 22, 0.08)",
        boxShadow: "0 10px 30px rgba(44, 30, 22, 0.03)",
      }}
    >
      {/* Soft gradient effect on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(circle at top right, rgba(193, 91, 61, 0.03) 0%, transparent 70%)",
        }}
      />
      
      <div className="flex items-center gap-4 mb-4 relative z-10">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
          style={{
            background: "rgba(193, 91, 61, 0.1)",
            color: "#C15B3D",
          }}
        >
          {icon}
        </div>
        <h3 className="text-xl font-bold text-[#2C1E16]">{title}</h3>
      </div>
      
      <div className="relative z-10 text-[#2C1E16]/70 leading-relaxed text-sm sm:text-base">
        {children}
      </div>
    </motion.div>
  );
}

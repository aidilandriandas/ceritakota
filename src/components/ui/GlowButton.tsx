"use client";

import { motion } from "framer-motion";
import React, { useState, useRef } from "react";

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function GlowButton({
  children,
  onClick,
  className = "",
}: GlowButtonProps) {
  const [ripples, setRipples] = useState<
    { x: number; y: number; id: number }[]
  >([]);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();
      setRipples((prev) => [...prev, { x, y, id }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
    }
    onClick?.();
  };

  return (
    <motion.button
      ref={btnRef}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      className={`relative inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-2xl overflow-hidden cursor-pointer transition-shadow duration-300 ${className}`}
      style={{
        background: "linear-gradient(135deg, #ffd700, #ffaa00)",
        color: "#050816",
        boxShadow:
          "0 0 30px rgba(255, 215, 0, 0.4), 0 0 60px rgba(255, 215, 0, 0.15), 0 4px 20px rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* Efek neon glow di belakang */}
      <span
        className="absolute inset-0 rounded-2xl opacity-40"
        style={{
          background:
            "linear-gradient(135deg, rgba(0, 255, 255, 0.3), rgba(0, 179, 255, 0.3))",
        }}
      />

      {/* Efek ripple pada klik */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      ))}

      <span className="relative z-10 tracking-wide">{children}</span>
    </motion.button>
  );
}

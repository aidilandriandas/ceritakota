"use client";

import { motion } from "framer-motion";
import GlowButton from "./GlowButton";

export default function Hero() {
  return (
    <section
      id="beranda"
      className="relative flex min-h-screen flex-col items-center justify-center text-center px-4 overflow-hidden"
    >
      {/* Ambient radial lighting di belakang judul */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 255, 255, 0.12) 0%, rgba(0, 179, 255, 0.06) 40%, transparent 70%)",
        }}
      />

      {/* Ambient lighting kedua – gold */}
      <div
        className="absolute top-2/3 left-1/3 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 215, 0, 0.08) 0%, transparent 60%)",
        }}
      />

      {/* Badge kecil di atas judul */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-6"
      >
        <span
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase"
          style={{
            background: "rgba(0, 255, 255, 0.08)",
            border: "1px solid rgba(0, 255, 255, 0.2)",
            color: "#00ffff",
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{
              background: "#00ffff",
              boxShadow: "0 0 8px rgba(0, 255, 255, 0.6)",
            }}
          />
          Eksplorasi Digital
        </span>
      </motion.div>

      {/* Judul utama */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-6"
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #00ffff 50%, #00b3ff 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Jelajahi Indonesia
      </motion.h1>

      {/* Subjudul */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed"
        style={{ color: "rgba(255, 255, 255, 0.6)" }}
      >
        Setiap kota punya cerita. Temukan ceritanya di sini.
      </motion.p>

      {/* Tombol CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <GlowButton>Mulai Eksplorasi</GlowButton>
      </motion.div>

      {/* Statistik kecil di bawah tombol */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="flex items-center gap-8 mt-16"
      >
        {[
          { value: "38", label: "Provinsi" },
          { value: "500+", label: "Kota" },
          { value: "17.000+", label: "Pulau" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div
              className="text-2xl md:text-3xl font-bold"
              style={{ color: "#00ffff" }}
            >
              {stat.value}
            </div>
            <div
              className="text-xs md:text-sm mt-1"
              style={{ color: "rgba(255, 255, 255, 0.4)" }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

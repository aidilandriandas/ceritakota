"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  dx: number;
  dy: number;
  color: string;
}

/**
 * Komponen partikel ringan menggunakan Canvas HTML5.
 * Menampilkan partikel mengambang dengan berbagai ukuran, kecepatan,
 * dan opasitas secara acak. Tidak menggunakan library berat.
 */
export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    // Sesuaikan ukuran canvas dengan layar
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Warna partikel: putih, cyan, biru elektrik
    const colors = [
      "255, 255, 255",
      "0, 255, 255",
      "0, 179, 255",
      "255, 215, 0",
    ];

    // Buat partikel acak
    const particleCount = Math.min(100, Math.floor(window.innerWidth / 15));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        // Perbarui posisi
        p.x += p.dx;
        p.y += p.dy;

        // Pantulan di tepi layar
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        // Gambar partikel dengan blur lembut
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx.shadowBlur = p.radius * 4;
        ctx.shadowColor = `rgba(${p.color}, ${p.opacity * 0.5})`;
        ctx.fill();
        ctx.closePath();
      }

      // Reset shadow agar tidak mempengaruhi elemen lain
      ctx.shadowBlur = 0;

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}

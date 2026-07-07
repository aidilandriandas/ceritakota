"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import * as d3Geo from "d3-geo";
import { useRouter } from "next/navigation";
import indonesiaData from "@/data/indonesia-provinces.json";
import { getProvinceByGeoName } from "@/data/provinces-meta";

interface Feature {
  type: string;
  geometry: {
    type: string;
    coordinates: number[][][] | number[][][][];
  };
  properties: {
    ID: number;
    kode: number;
    Propinsi: string;
    SUMBER: string;
  };
}

interface GeoJSON {
  type: string;
  features: Feature[];
}

export default function IndonesiaMap() {
  const router = useRouter();
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);

  const width = 1000;
  const height = 500;

  const projection = useMemo(() => {
    return d3Geo
      .geoMercator()
      .center([118, -2.5])
      .scale(1200)
      .translate([width / 2, height / 2]);
  }, []);

  const pathGenerator = useMemo(() => {
    return d3Geo.geoPath().projection(projection);
  }, [projection]);

  const geoData = indonesiaData as unknown as GeoJSON;

  const formatName = (name: string) => {
    return name
      .split(" ")
      .map((word) =>
        word.length <= 2
          ? word
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");
  };

  const handleProvinceClick = (geoName: string) => {
    const meta = getProvinceByGeoName(geoName);
    if (meta) {
      router.push(`/provinsi/${meta.slug}`);
    }
  };

  return (
    <section id="jelajah" className="relative w-full h-screen flex flex-col items-center justify-center pt-16 px-4">
      {/* Background motif batik/elegan (opsional, saat ini polos krem) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: "radial-gradient(#60A5FA 1px, transparent 1px)",
          backgroundSize: "20px 20px"
        }}
      />

      {/* Judul mengambang di atas peta */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-28 z-10 text-center pointer-events-none"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-2 text-white drop-shadow-lg">
          Aidil Andriandas
        </h1>
        <p className="text-slate-300 text-lg font-medium">
          Jelajahi keindahan budaya dan sejarah di seluruh penjuru Nusantara.
        </p>
      </motion.div>

      {/* Tooltip */}
      {hoveredProvince && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-xl text-sm font-bold pointer-events-none"
          style={{
            background: "rgba(30, 41, 59, 0.95)",
            border: "1px solid rgba(59, 130, 246, 0.4)",
            color: "#60A5FA",
            backdropFilter: "blur(10px)",
            boxShadow: "0 10px 25px rgba(59, 130, 246, 0.2)",
          }}
        >
          {hoveredProvince}
        </motion.div>
      )}

      {/* SVG Map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative w-full max-w-7xl mx-auto mt-20"
      >
        <motion.svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto drop-shadow-2xl"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          {geoData.features.map((feature) => {
            const d = pathGenerator(feature.geometry as d3Geo.GeoPermissibleObjects);
            if (!d) return null;

            const originalName = feature.properties.Propinsi;
            const formattedName = formatName(originalName);
            const isHovered = hoveredProvince === formattedName;
            
            // Cek apakah provinsi ini ada di data kita
            const hasData = getProvinceByGeoName(originalName) !== undefined;

            return (
              <path
                key={feature.properties.ID}
                d={d}
                onMouseEnter={() => setHoveredProvince(formattedName)}
                onMouseLeave={() => setHoveredProvince(null)}
                onClick={() => handleProvinceClick(originalName)}
                className={hasData ? "cursor-pointer" : "cursor-not-allowed"}
                style={{
                  fill: hasData
                    ? isHovered
                      ? "#1E40AF" // Biru gelap saat dihover
                      : "#3B82F6" // Biru cerah untuk provinsi aktif
                    : isHovered
                    ? "#475569" // Slate agak terang saat inactive dihover
                    : "#334155", // Warna daratan untuk provinsi inactive (slate gelap)
                  stroke: hasData
                    ? isHovered
                      ? "#60A5FA"
                      : "rgba(96, 165, 250, 0.4)" // Garis biru transparan untuk yang aktif
                    : "rgba(148, 163, 184, 0.2)", // Garis tepi samar untuk inactive
                  strokeWidth: isHovered ? 1.5 : 0.8,
                  transition: "all 0.3s ease",
                }}
              />
            );
          })}
        </motion.svg>
      </motion.div>
    </section>
  );
}

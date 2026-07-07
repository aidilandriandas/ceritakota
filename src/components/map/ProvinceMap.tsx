"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import * as d3Geo from "d3-geo";
import { useRouter } from "next/navigation";
import { ProvinceMeta } from "@/data/provinces-meta";
import { CityInfo } from "@/data/types";
import indonesiaData from "@/data/indonesia-provinces.json";

interface ProvinceMapProps {
  province: ProvinceMeta;
  cities: CityInfo[];
}

export default function ProvinceMap({ province, cities }: ProvinceMapProps) {
  const router = useRouter();
  const [hoveredCity, setHoveredCity] = useState<CityInfo | null>(null);

  const width = 800;
  const height = 500;

  // Temukan fitur GeoJSON untuk provinsi ini
  const provinceFeature = useMemo(() => {
    return (indonesiaData.features as any[]).find(
      (f) => f.properties.Propinsi === province.geoName
    );
  }, [province]);

  // Proyeksi khusus untuk provinsi ini (Otomatis fit ke tengah layar)
  const projection = useMemo(() => {
    if (!provinceFeature) {
      // Fallback
      return d3Geo
        .geoMercator()
        .center(province.center)
        .scale(province.scale)
        .translate([width / 2, height / 2]);
    }
    
    // Auto-fit ke bounding box dengan padding 40px
    return d3Geo
      .geoMercator()
      .fitExtent(
        [
          [40, 40],
          [width - 40, height - 40],
        ],
        provinceFeature
      );
  }, [provinceFeature, province.center, province.scale]);

  const pathGenerator = useMemo(() => {
    return d3Geo.geoPath().projection(projection);
  }, [projection]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Tooltip Kota */}
      {hoveredCity && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute z-50 p-4 rounded-xl shadow-lg pointer-events-none min-w-[200px]"
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(44, 30, 22, 0.1)",
            top: "20px",
            right: "20px",
          }}
        >
          <div className="mb-2 border-b border-[#2C1E16]/10 pb-2">
            <h4 className="font-extrabold text-[#2C1E16] text-lg">{hoveredCity.name}</h4>
            <p className="text-[#C15B3D] text-xs font-semibold">{hoveredCity.tagline}</p>
          </div>
          
          <div className="space-y-1">
            {hoveredCity.population && (
              <p className="text-sm text-[#2C1E16]/80">
                <span className="font-semibold text-[#2C1E16]">Populasi:</span> {hoveredCity.population} jiwa
              </p>
            )}
            {hoveredCity.status && (
              <p className="text-sm text-[#2C1E16]/80 flex items-center gap-1">
                <span className="font-semibold text-[#2C1E16]">Status:</span> 
                <span className="text-[#C15B3D] flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
                  {hoveredCity.status}
                </span>
              </p>
            )}
          </div>
        </motion.div>
      )}

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full max-h-[60vh] drop-shadow-md">
        {/* Gambar batas provinsi */}
        {provinceFeature && (
          <path
            d={pathGenerator(provinceFeature)!}
            fill="#EAE6DB"
            stroke="#C15B3D"
            strokeWidth={1.5}
            style={{ opacity: 0.8 }}
          />
        )}

        {/* Render titik kota */}
        {cities.map((city) => {
          const [x, y] = projection(city.coordinates) || [0, 0];
          const isHovered = hoveredCity?.slug === city.slug;

          return (
            <g
              key={city.slug}
              transform={`translate(${x}, ${y})`}
              onMouseEnter={() => setHoveredCity(city)}
              onMouseLeave={() => setHoveredCity(null)}
              onClick={() => router.push(`/kota/${city.slug}`)}
              className="cursor-pointer"
            >
              {/* Lingkaran luar (pulse) */}
              <motion.circle
                r={isHovered ? 14 : 8}
                fill="rgba(193, 91, 61, 0.2)"
                animate={{
                  scale: isHovered ? [1, 1.3, 1] : 1,
                }}
                transition={{ repeat: isHovered ? Infinity : 0, duration: 1.5 }}
              />
              
              {/* Lingkaran dalam */}
              <circle
                r={isHovered ? 7 : 5}
                fill="#C15B3D"
                stroke="#ffffff"
                strokeWidth={2}
                className="shadow-xl drop-shadow-xl"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

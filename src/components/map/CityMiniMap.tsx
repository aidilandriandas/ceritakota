"use client";

import { useMemo } from "react";
import * as d3Geo from "d3-geo";
import indonesiaData from "@/data/indonesia-provinces.json";
import payakumbuhData from "@/data/payakumbuh.json";
import { ProvinceMeta } from "@/data/provinces-meta";
import { CityInfo } from "@/data/types";
import { MapPin } from "lucide-react";

interface CityMiniMapProps {
  province: ProvinceMeta;
  city: CityInfo;
}

export default function CityMiniMap({ province, city }: CityMiniMapProps) {
  const width = 300;
  const height = 250;

  const cityFeature = useMemo(() => {
    if (city.name.toLowerCase() === "payakumbuh" || city.name.toLowerCase().includes("payakumbuh")) {
      return (payakumbuhData as any).features[0];
    }
    return null;
  }, [city]);

  const provinceFeature = useMemo(() => {
    return (indonesiaData.features as any[]).find(
      (f) => f.properties.Propinsi === province.geoName
    );
  }, [province]);

  const targetFeature = cityFeature || provinceFeature;

  const projection = useMemo(() => {
    if (!targetFeature) {
      return d3Geo
        .geoMercator()
        .center(province.center)
        .scale(province.scale * 0.4) // Skala lebih kecil untuk mini map
        .translate([width / 2, height / 2]);
    }
    
    return d3Geo
      .geoMercator()
      .fitSize([width - 40, height - 40], targetFeature);
  }, [targetFeature, province, width, height]);

  const pathGenerator = d3Geo.geoPath().projection(projection);
  
  const [x, y] = projection(city.coordinates) || [0, 0];

  return (
    <div className="relative bg-white/50 backdrop-blur-md border border-white/40 rounded-3xl p-6 shadow-xl shadow-black/5 overflow-hidden flex flex-col items-center justify-center">
      <h3 className="text-sm font-bold text-[#C15B3D] tracking-widest uppercase mb-4">Peta Lokasi</h3>
      <svg width={width} height={height} className="overflow-visible">
        {targetFeature && (
          <path
            d={pathGenerator(targetFeature) || ""}
            fill="#EBE5D9"
            stroke="#D4CBBB"
            strokeWidth={1.5}
            className="transition-all duration-300"
          />
        )}
        
        {/* Titik Kota */}
        <g transform={`translate(${x}, ${y})`}>
          <circle r={8} fill="#C15B3D" className="animate-ping opacity-75" />
          <circle r={4} fill="#C15B3D" />
          <foreignObject x="-12" y="-30" width="24" height="24">
            <MapPin size={24} className="text-[#C15B3D] drop-shadow-md" />
          </foreignObject>
        </g>
      </svg>
    </div>
  );
}

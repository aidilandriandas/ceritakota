const fs = require('fs');
const path = require('path');

// Load d3-geo from node_modules dynamically
const d3Geo = require('d3-geo');

const inputPath = path.join(__dirname, '../src/data/indonesia-provinces.json');
const rawData = fs.readFileSync(inputPath, 'utf8');
const data = JSON.parse(rawData);

function formatName(name) {
  if (name.includes('DI. ')) return name; // Special case for DI. ACEH
  return name.split(" ").map(w => w.length <= 2 ? w : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
}

const provinces = [];
const allCitiesData = {};

data.features.forEach(f => {
  const rawName = f.properties.Propinsi;
  let name = formatName(rawName);
  
  // Custom tweaks for common names
  if (rawName === "DAERAH KHUSUS IBUKOTA JAKARTA") name = "DKI Jakarta";
  if (rawName === "DI. ACEH") name = "Aceh";
  if (rawName === "DAERAH ISTIMEWA YOGYAKARTA") name = "DI Yogyakarta";
  if (rawName.startsWith("PRO")) name = name.substring(3); // e.g. PROJAWA BARAT

  let slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  if (slug === 'dki-jakarta') slug = 'dki-jakarta';

  const center = d3Geo.geoCentroid(f);

  provinces.push({
    id: f.properties.ID,
    slug: slug,
    geoName: rawName, // Keep original name for map matching
    name: name,
    description: `Jelajahi keindahan sejarah, budaya, dan pesona wisata di ${name}. Representasi digital Nusantara yang memukau.`,
    center: [Math.round(center[0] * 10000) / 10000, Math.round(center[1] * 10000) / 10000],
    scale: 22000,
    capital: "Ibu Kota " + name,
    area: "Menunggu Data",
    population: "Menunggu Data"
  });

  // Generate 1 dummy city per province so it's clickable
  allCitiesData[slug] = [
    {
      slug: "kota-utama",
      name: "Pusat Kota " + name,
      tagline: "Jantung Peradaban",
      coordinates: [Math.round(center[0] * 10000) / 10000, Math.round(center[1] * 10000) / 10000],
      sejarah: `Ini adalah halaman informasi pusat kota di ${name}. Data sejarah akan segera dilengkapi melalui kontribusi generasi muda di Nusantara Digital City.`,
      kuliner: [
        { name: "Kuliner Khas 1", description: "Deskripsi kuliner khas daerah ini yang kaya akan rempah." },
        { name: "Kuliner Khas 2", description: "Minuman tradisional yang menyegarkan." }
      ],
      budaya: [
        { name: "Seni Tradisional", description: "Warisan budaya tak benda peninggalan leluhur." }
      ],
      wisata: [
        { name: "Destinasi Unggulan", description: "Tempat wisata alam maupun buatan yang wajib dikunjungi." }
      ]
    }
  ];
});

// Write provinces-meta.ts
let metaContent = `// AUTO GENERATED
export interface ProvinceMeta {
  id: number;
  slug: string;
  geoName: string;
  name: string;
  description: string;
  center: [number, number];
  scale: number;
  capital: string;
  area: string;
  population: string;
}

export const provinces: ProvinceMeta[] = ${JSON.stringify(provinces, null, 2)};

export function getProvinceBySlug(slug: string): ProvinceMeta | undefined {
  return provinces.find((p) => p.slug === slug);
}

export function getProvinceByGeoName(geoName: string): ProvinceMeta | undefined {
  return provinces.find((p) => p.geoName === geoName);
}
`;
fs.writeFileSync(path.join(__dirname, '../src/data/provinces-meta.ts'), metaContent);

// Modify the existing cities/index.ts to just use this auto-generated file as base, but we will overwrite it completely
let citiesContent = `// AUTO GENERATED
import { CityData } from "../types";

export const citiesByProvince: CityData = ${JSON.stringify(allCitiesData, null, 2)};

export function getCitiesByProvinceSlug(slug: string) {
  return citiesByProvince[slug] || [];
}

export function getCityBySlug(provinceSlug: string, citySlug: string) {
  const cities = citiesByProvince[provinceSlug];
  if (!cities) return undefined;
  return cities.find((city) => city.slug === citySlug);
}
`;
fs.writeFileSync(path.join(__dirname, '../src/data/cities/index.ts'), citiesContent);

console.log("Successfully generated all provinces and default cities!");

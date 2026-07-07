// AUTO GENERATED
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

export const provinces: ProvinceMeta[] = [
  {
    "id": 26,
    "slug": "sumatera-barat",
    "geoName": "SUMATERA BARAT",
    "name": "Sumatera Barat",
    "description": "Jelajahi keindahan sejarah, budaya, dan pesona wisata di Sumatera Barat. Representasi digital Nusantara yang memukau.",
    "center": [
      100.4595,
      -0.8626
    ],
    "scale": 22000,
    "capital": "Ibu Kota Sumatera Barat",
    "area": "Menunggu Data",
    "population": "Menunggu Data"
  }
];


export function getProvinceBySlug(slug: string) {
  return provinces.find(p => p.slug === slug);
}

export function getProvinceByGeoName(geoName: string) {
  return provinces.find(p => p.geoName === geoName);
}

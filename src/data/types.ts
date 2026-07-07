/**
 * Tipe data untuk informasi kota.
 */
export interface CityInfo {
  slug: string;
  name: string;
  tagline: string;
  coordinates: [number, number]; // [longitude, latitude]
  sejarah: string;
  kuliner: { name: string; description: string }[];
  budaya: { name: string; description: string }[];
  wisata: { name: string; description: string }[];
  teknologi?: { name: string; description: string }[];
  population?: string;
  status?: string;
  image?: string;
}

export type CityData = Record<string, CityInfo[]>;

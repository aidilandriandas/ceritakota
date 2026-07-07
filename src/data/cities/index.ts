// AUTO GENERATED
import { CityData } from "../types";

export const citiesByProvince: CityData = {
  "sumatera-barat": [
    {
      "slug": "payakumbuh",
      "name": "Payakumbuh",
      "tagline": "Kota Gelamai di Jantung Minangkabau",
      "coordinates": [
        100.6334,
        -0.2159
      ],
      "population": "141 Ribu",
      "status": "Heritage City",
      "image": "https://images.unsplash.com/photo-1549474136-22a84d4ab375?w=1600&q=80",
      "sejarah": "Payakumbuh, sering dijuluki sebagai 'Kota Gelamai', adalah salah satu kota terpenting di Sumatera Barat. Berada di kawasan luak 50 (Luhak Limopuluah), kota ini tidak hanya menjadi pusat pertumbuhan ekonomi di wilayah timur Sumatera Barat, tetapi juga menyimpan peradaban tua kebudayaan Minangkabau. Dari lembah-lembah nan hijau hingga peninggalan arsitektur masa lalu, Payakumbuh terus melestarikan pesona pusaka leluhur dengan sangat apik.",
      "kuliner": [
        { "name": "Galamai", "description": "Camilan khas mirip dodol yang kenyal, manis, dan dibuat dari tepung beras ketan, gula aren, dan santan kelapa." },
        { "name": "Rendang Runtiah", "description": "Varian unik rendang dari Payakumbuh yang disuwir halus, menawarkan tekstur renyah dan bumbu rempah yang sangat meresap." },
        { "name": "Batia", "description": "Kerupuk khas yang digoreng hingga renyah, menjadi pendamping wajib saat menyantap hidangan berkuah." }
      ],
      "budaya": [
        { "name": "Pacu Itiak", "description": "Tradisi unik balapan itik terbang yang hanya dapat ditemui di wilayah Payakumbuh dan sekitarnya." },
        { "name": "Seni Randai", "description": "Teater tradisional Minangkabau yang menggabungkan seni bela diri (silek), tarian, musik, dan sastra lisan." }
      ],
      "wisata": [
        { "name": "Lembah Harau", "description": "Meski secara administratif sebagian masuk Kabupaten Limapuluh Kota, Lembah Harau dengan tebing granit setinggi 100-500 meter adalah ikon pariwisata yang sangat melekat dengan Payakumbuh." },
        { "name": "Bukit Kelinci", "description": "Destinasi wisata keluarga dengan nuansa alam perbukitan yang sejuk dan asri, dilengkapi dengan peternakan kelinci yang lucu." },
        { "name": "Jembatan Ratapan Ibu", "description": "Monumen bersejarah yang melambangkan perjuangan pahlawan lokal dan air mata ibu dalam mempertahankan kemerdekaan." }
      ],
      "teknologi": [
        { "name": "Payakumbuh Smart City", "description": "Implementasi sistem digitalisasi terpadu untuk pelayanan publik, pemantauan CCTV lalu lintas real-time, dan akses WiFi gratis di ruang publik." },
        { "name": "Sentra IKM Rendang Digital", "description": "Kawasan industri kecil menengah (IKM) Rendang yang mengadopsi teknologi pengemasan modern (retort) dan pemasaran e-commerce internasional." }
      ]
    }
  ]
};

export function getCitiesByProvinceSlug(slug: string) {
  return citiesByProvince[slug] || [];
}

export function getCityBySlug(provinceSlug: string, citySlug: string) {
  const provinceCities = citiesByProvince[provinceSlug];
  if (!provinceCities) {
    for (const provSlug in citiesByProvince) {
      const city = citiesByProvince[provSlug].find(c => c.slug === citySlug);
      if (city) return city;
    }
    return undefined;
  }

  return provinceCities.find(c => c.slug === citySlug);
}

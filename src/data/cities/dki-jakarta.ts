import { CityInfo } from "../types";

export const dkiJakartaCities: CityInfo[] = [
  {
    slug: "jakarta-pusat",
    name: "Jakarta Pusat",
    tagline: "Jantung Ibukota",
    coordinates: [106.8456, -6.1862],
    sejarah:
      "Jakarta Pusat adalah inti dari ibukota negara. Di sinilah berdiri Monas (Monumen Nasional), simbol kemerdekaan Indonesia yang diresmikan tahun 1961. Kawasan ini juga menyimpan sejarah panjang mulai dari era Kerajaan Sunda Kelapa, penjajahan Belanda (Batavia), hingga menjadi pusat pemerintahan modern.",
    kuliner: [
      { name: "Kerak Telor", description: "Makanan khas Betawi dari telur bebek, beras ketan, dan kelapa sangrai yang dimasak di atas tungku." },
      { name: "Soto Betawi", description: "Soto berkuah santan kental dengan daging sapi, kentang, dan tomat." },
      { name: "Nasi Uduk", description: "Nasi yang diaron dengan santan, disajikan dengan lauk pelengkap khas Betawi." },
    ],
    budaya: [
      { name: "Ondel-ondel", description: "Boneka raksasa khas Betawi yang digunakan dalam arak-arakan dan perayaan." },
      { name: "Lenong", description: "Seni pertunjukan teater rakyat Betawi dengan dialog lucu dan cerita kehidupan sehari-hari." },
      { name: "Tari Yapong", description: "Tarian modern Betawi yang menggambarkan kegembiraan masyarakat Jakarta." },
    ],
    wisata: [
      { name: "Monumen Nasional (Monas)", description: "Tugu setinggi 132 meter yang menjadi simbol perjuangan kemerdekaan Indonesia." },
      { name: "Museum Nasional", description: "Museum terbesar di Indonesia dengan koleksi artefak prasejarah hingga modern." },
      { name: "Masjid Istiqlal", description: "Masjid terbesar di Asia Tenggara, terletak bersebelahan dengan Gereja Katedral." },
    ],
  },
  {
    slug: "jakarta-selatan",
    name: "Jakarta Selatan",
    tagline: "Kota Modern & Kreatif",
    coordinates: [106.8229, -6.2615],
    sejarah:
      "Jakarta Selatan berkembang pesat sejak tahun 1970-an sebagai kawasan pemukiman elit dan pusat bisnis modern. Kawasan Kemang, Senopati, dan SCBD menjadi simbol Jakarta yang kosmopolitan.",
    kuliner: [
      { name: "Nasi Goreng Kambing Kebon Sirih", description: "Nasi goreng dengan daging kambing yang empuk dan bumbu rempah khas." },
      { name: "Bubur Ayam Barito", description: "Bubur ayam legendaris yang sudah ada sejak tahun 1960-an." },
      { name: "Kopi Tuku", description: "Kopi susu gula aren yang menjadi tren kopi kekinian Indonesia." },
    ],
    budaya: [
      { name: "Seni Mural Kemang", description: "Kawasan seni jalanan dengan mural-mural karya seniman lokal dan internasional." },
      { name: "Komunitas Kreatif", description: "Pusat komunitas startup, desain, dan seni kontemporer Jakarta." },
    ],
    wisata: [
      { name: "Ragunan Zoo", description: "Kebun binatang seluas 140 hektar dengan koleksi satwa Indonesia." },
      { name: "SCBD", description: "Kawasan bisnis dan hiburan modern dengan gedung-gedung pencakar langit." },
    ],
  },
  {
    slug: "jakarta-utara",
    name: "Jakarta Utara",
    tagline: "Pelabuhan & Sejarah Maritim",
    coordinates: [106.894, -6.121],
    sejarah:
      "Jakarta Utara memiliki sejarah maritim yang panjang. Pelabuhan Sunda Kelapa adalah pelabuhan tertua di Jakarta yang sudah beroperasi sejak abad ke-12. Kawasan Kota Tua menyimpan bangunan-bangunan peninggalan Belanda.",
    kuliner: [
      { name: "Laksa Betawi", description: "Laksa khas Betawi dengan kuah kuning kental dan bihun." },
      { name: "Ikan Bakar Muara Karang", description: "Seafood segar langsung dari nelayan dengan bumbu khas pesisir." },
    ],
    budaya: [
      { name: "Kota Tua Jakarta", description: "Kawasan bersejarah dengan arsitektur kolonial Belanda yang masih terjaga." },
      { name: "Museum Fatahillah", description: "Bekas balai kota Batavia yang kini menjadi museum sejarah Jakarta." },
    ],
    wisata: [
      { name: "Ancol Dreamland", description: "Kawasan rekreasi terpadu dengan pantai, taman bermain, dan Sea World." },
      { name: "Pelabuhan Sunda Kelapa", description: "Pelabuhan kapal pinisi tradisional yang masih beroperasi." },
    ],
  },
];

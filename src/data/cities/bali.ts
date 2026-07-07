import { CityInfo } from "../types";

export const bali: CityInfo[] = [
  {
    slug: "denpasar",
    name: "Denpasar",
    tagline: "Pusat Kebudayaan dan Pemerintahan",
    coordinates: [115.2166, -8.65],
    sejarah:
      "Denpasar adalah ibu kota Bali yang menjadi pusat pemerintahan, perdagangan, dan pendidikan. Namanya berasal dari kata 'den' (utara) dan 'pasar', mengacu pada posisinya di utara pasar utama Kerajaan Badung. Kota ini memiliki monumen perjuangan Puputan Badung.",
    kuliner: [
      { name: "Ayam Betutu", description: "Ayam utuh berisi bumbu khas Bali yang dipanggang lambat." },
      { name: "Nasi Campur Bali", description: "Nasi dengan berbagai lauk seperti sate lilit, lawar, dan ayam suwir." },
      { name: "Sate Lilit", description: "Sate dari daging cincang (ikan/ayam/babi) yang dililitkan pada batang serai." },
    ],
    budaya: [
      { name: "Ogoh-ogoh", description: "Patung raksasa yang diarak sehari sebelum Nyepi untuk mengusir roh jahat." },
      { name: "Tari Barong", description: "Tarian yang melambangkan pertempuran antara kebaikan (Barong) dan kejahatan (Rangda)." },
    ],
    wisata: [
      { name: "Monumen Bajra Sandhi", description: "Monumen perjuangan rakyat Bali yang terletak di Lapangan Puputan Renon." },
      { name: "Museum Bali", description: "Museum yang menyimpan koleksi seni dan sejarah peninggalan kebudayaan Bali." },
      { name: "Pantai Sanur", description: "Pantai dengan pasir putih yang terkenal dengan keindahan matahari terbitnya." },
    ],
  },
  {
    slug: "ubud",
    name: "Ubud",
    tagline: "Jantung Kesenian Bali",
    coordinates: [115.2625, -8.5069],
    sejarah:
      "Ubud berasal dari kata 'ubad' yang berarti obat, karena banyaknya tanaman berkhasiat di sekitar sungai Campuhan. Sejak tahun 1930-an, Ubud berkembang menjadi pusat seni dan budaya Bali berkat kedatangan seniman-seniman Eropa.",
    kuliner: [
      { name: "Babi Guling", description: "Babi panggang utuh dengan bumbu rempah tradisional Bali." },
      { name: "Bebek Tepi Sawah", description: "Bebek goreng garing khas Ubud yang disajikan dengan sambal matah." },
      { name: "Jaja Pasar", description: "Kue tradisional Bali yang manis, terbuat dari tepung ketan dan gula merah." },
    ],
    budaya: [
      { name: "Seni Lukis Kamasan", description: "Gaya lukisan tradisional klasik Bali." },
      { name: "Tari Kecak", description: "Tarian paduan suara pria tanpa alat musik, menceritakan kisah Ramayana." },
    ],
    wisata: [
      { name: "Monkey Forest", description: "Kawasan hutan lindung yang dihuni oleh ratusan kera ekor panjang." },
      { name: "Terasering Tegalalang", description: "Pemandangan sawah bertingkat (subak) yang indah." },
      { name: "Campuhan Ridge Walk", description: "Jalur pejalan kaki di atas bukit dengan pemandangan lembah hijau." },
    ],
  }
];

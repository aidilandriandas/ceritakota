import { CityInfo } from "../types";

export const jawaTengah: CityInfo[] = [
  {
    slug: "semarang",
    name: "Semarang",
    tagline: "Venetie van Java",
    coordinates: [110.4227, -6.9666],
    sejarah:
      "Kota Semarang merupakan ibukota provinsi Jawa Tengah. Memiliki percampuran budaya Jawa, Tionghoa, dan Arab. Kawasan Kota Lama Semarang dengan bangunan-bangunan era kolonial Belanda sering dijuluki 'Little Netherland'.",
    kuliner: [
      { name: "Lumpia Semarang", description: "Jajanan khas dengan isian rebung, telur, dan daging ayam atau udang." },
      { name: "Tahu Gimbal", description: "Tahu goreng dengan gimbal (bakwan udang), sayuran, dan bumbu kacang." },
      { name: "Wingko Babat", description: "Kue manis dari kelapa parut dan tepung ketan." },
    ],
    budaya: [
      { name: "Dugderan", description: "Tradisi menyambut bulan Ramadhan dengan arak-arakan Warak Ngendog." },
      { name: "Warak Ngendog", description: "Simbol perpaduan budaya (Naga Tiongkok, Buraq Arab, Kambing Jawa) khas Semarang." },
    ],
    wisata: [
      { name: "Lawang Sewu", description: "Bangunan bersejarah peninggalan Belanda yang terkenal dengan pintunya yang sangat banyak." },
      { name: "Sam Poo Kong", description: "Kelenteng tertua di Semarang peninggalan Laksamana Cheng Ho." },
      { name: "Kota Lama", description: "Kawasan dengan arsitektur Eropa klasik abad ke-18 dan 19." },
    ],
  },
  {
    slug: "surakarta",
    name: "Surakarta (Solo)",
    tagline: "The Spirit of Java",
    coordinates: [110.8242, -7.5666],
    sejarah:
      "Surakarta atau Solo merupakan pewaris Kesultanan Mataram. Menjadi pusat kebudayaan Jawa bersama Yogyakarta. Di kota ini terdapat Keraton Kasunanan dan Pura Mangkunegaran.",
    kuliner: [
      { name: "Nasi Liwet", description: "Nasi gurih dengan lauk ayam suwir, telur, dan areh (santan kental)." },
      { name: "Tengkleng", description: "Sup tulang kambing bercita rasa gurih pedas manis." },
      { name: "Serabi Notosuman", description: "Serabi khas Solo yang lembut tanpa kuah kinca." },
    ],
    budaya: [
      { name: "Batik Solo", description: "Batik tradisional Jawa dengan motif khas seperti Sido Mukti." },
      { name: "Tari Bedhaya", description: "Tari sakral keraton yang melambangkan keagungan dan keseimbangan." },
    ],
    wisata: [
      { name: "Keraton Surakarta", description: "Istana resmi Kasunanan Surakarta Hadiningrat." },
      { name: "Pasar Klewer", description: "Pusat perdagangan batik terbesar di Indonesia." },
      { name: "Pura Mangkunegaran", description: "Istana tempat kediaman penguasa Praja Mangkunegaran." },
    ],
  }
];

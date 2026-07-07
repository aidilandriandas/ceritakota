import { CityInfo } from "../types";

export const jawaBarat: CityInfo[] = [
  {
    slug: "bandung",
    name: "Bandung",
    tagline: "Paris van Java",
    coordinates: [107.6191, -6.9175],
    sejarah:
      "Bandung dijuluki 'Paris van Java' oleh orang Belanda karena keindahannya. Kota ini menjadi saksi Konferensi Asia-Afrika tahun 1955 yang bersejarah. Gedung Merdeka masih berdiri kokoh sebagai pengingat momen penting diplomasi dunia.",
    kuliner: [
      { name: "Batagor", description: "Bakso tahu goreng dengan bumbu kacang khas Bandung yang gurih." },
      { name: "Mie Kocok", description: "Mie kuah kaldu sapi dengan kikil, tauge, dan bawang goreng." },
      { name: "Surabi", description: "Pancake tradisional Sunda dari tepung beras dengan topping oncom atau coklat." },
      { name: "Seblak", description: "Kerupuk basah pedas dengan berbagai topping, makanan kekinian khas Bandung." },
    ],
    budaya: [
      { name: "Angklung", description: "Alat musik bambu khas Sunda yang telah diakui UNESCO sebagai warisan budaya dunia." },
      { name: "Wayang Golek", description: "Pertunjukan wayang tiga dimensi dari kayu yang menceritakan kisah Ramayana dan Mahabharata." },
      { name: "Tari Jaipong", description: "Tarian energik Sunda yang menggabungkan gerakan pencak silat dan tarian rakyat." },
    ],
    wisata: [
      { name: "Gedung Merdeka", description: "Tempat bersejarah Konferensi Asia-Afrika 1955." },
      { name: "Tangkuban Perahu", description: "Gunung berapi aktif dengan kawah yang bisa dikunjungi wisatawan." },
      { name: "Kawah Putih", description: "Danau kawah vulkanik berwarna putih kehijauan di ketinggian 2.430 m." },
    ],
  },
  {
    slug: "bogor",
    name: "Bogor",
    tagline: "Kota Hujan",
    coordinates: [106.806, -6.595],
    sejarah:
      "Bogor dikenal sebagai 'Kota Hujan' dan merupakan bekas ibukota Kerajaan Sunda. Istana Bogor yang dibangun tahun 1745 menjadi kediaman resmi Presiden Indonesia.",
    kuliner: [
      { name: "Asinan Bogor", description: "Campuran buah-buahan dan sayuran segar dengan kuah asam pedas." },
      { name: "Toge Goreng", description: "Toge, tahu, dan mie yang digoreng dengan bumbu oncom khas Bogor." },
      { name: "Doclang", description: "Lontong dengan bumbu kacang, kerupuk, dan telur yang dibungkus daun patat." },
    ],
    budaya: [
      { name: "Kebun Raya Bogor", description: "Kebun botani tertua di Asia Tenggara, didirikan tahun 1817 oleh Caspar Georg Carl Reinwardt." },
    ],
    wisata: [
      { name: "Istana Bogor", description: "Istana kepresidenan dengan koleksi rusa yang berkeliaran bebas di halaman." },
      { name: "Kebun Raya Bogor", description: "Taman botani seluas 87 hektar dengan 15.000 spesies tanaman." },
      { name: "Taman Safari Indonesia", description: "Kebun binatang terbuka tempat hewan berkeliaran bebas." },
    ],
  },
  {
    slug: "cirebon",
    name: "Cirebon",
    tagline: "Kota Udang",
    coordinates: [108.557, -6.706],
    sejarah:
      "Cirebon adalah kota pelabuhan bersejarah yang menjadi pusat penyebaran Islam di Jawa Barat. Didirikan oleh Sunan Gunung Jati, salah satu Wali Songo.",
    kuliner: [
      { name: "Nasi Jamblang", description: "Nasi dibungkus daun jati dengan berbagai lauk pilihan." },
      { name: "Empal Gentong", description: "Gulai daging sapi khas Cirebon yang dimasak dalam gentong tanah liat." },
      { name: "Tahu Gejrot", description: "Tahu goreng dengan kuah cuka, bawang, dan cabai." },
    ],
    budaya: [
      { name: "Batik Mega Mendung", description: "Motif batik khas Cirebon dengan pola awan bergradasi yang dipengaruhi budaya Cina." },
      { name: "Tari Topeng Cirebon", description: "Tarian bertopeng yang menceritakan kisah Panji Asmoro Bangun." },
    ],
    wisata: [
      { name: "Keraton Kasepuhan", description: "Istana kerajaan tertua di Cirebon yang masih dihuni sultan." },
      { name: "Gua Sunyaragi", description: "Taman air dan gua buatan peninggalan Kerajaan Cirebon." },
    ],
  },
];

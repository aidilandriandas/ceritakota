import { CityInfo } from "../types";

export const sulawesiSelatan: CityInfo[] = [
  {
    slug: "makassar",
    name: "Makassar",
    tagline: "Kota Anging Mammiri",
    coordinates: [119.4327, -5.1476],
    sejarah:
      "Makassar dulunya dikenal sebagai Ujung Pandang, merupakan salah satu kota pesisir terbesar dan pelabuhan paling penting di Indonesia bagian timur. Pusat peradaban maritim Kerajaan Gowa-Tallo, kota ini memiliki Benteng Rotterdam peninggalan Belanda abad ke-17.",
    kuliner: [
      { name: "Coto Makassar", description: "Sup daging sapi kaya rempah dengan kuah kental perasan kacang tanah." },
      { name: "Pallubasa", description: "Mirip Coto tetapi ditaburi kelapa sangrai kering dan bisa ditambah kuning telur ayam kampung." },
      { name: "Pisang Epe", description: "Pisang bakar yang dipipihkan, disajikan dengan saus gula merah cair." },
      { name: "Es Pisang Ijo", description: "Pisang matang yang dibalut adonan tepung hijau, disajikan dengan bubur sumsum dan sirup." },
    ],
    budaya: [
      { name: "Tari Pakarena", description: "Tarian klasik yang menceritakan perpisahan penghuni boting langi (negeri kahyangan) dengan lino (bumi)." },
      { name: "Kapal Phinisi", description: "Kapal layar tradisional suku Bugis-Makassar yang legendaris di perairan Nusantara." },
    ],
    wisata: [
      { name: "Pantai Losari", description: "Ikon kota Makassar, tempat favorit menikmati sunset sambil makan Pisang Epe." },
      { name: "Fort Rotterdam", description: "Benteng peninggalan Belanda yang menyimpan sejarah kelam Pangeran Diponegoro." },
      { name: "Taman Nasional Bantimurung", description: "Dikenal sebagai 'The Kingdom of Butterfly' dengan ribuan kupu-kupu langka." },
    ],
  },
  {
    slug: "toraja-utara",
    name: "Toraja Utara",
    tagline: "Negeri di Atas Awan",
    coordinates: [119.88, -2.93],
    sejarah:
      "Toraja Utara terkenal dengan kekayaan budayanya yang unik, terutama ritual pemakamannya. Dimekarkan dari Kabupaten Tana Toraja pada tahun 2008 dengan ibu kota di Rantepao.",
    kuliner: [
      { name: "Pa'piong", description: "Daging babi atau ayam yang dimasak dengan bumbu dalam bambu lalu dibakar." },
      { name: "Kopi Toraja", description: "Kopi Arabika yang terkenal di dunia karena aromanya yang khas." },
      { name: "Deppa Tori", description: "Kue tradisional berbahan tepung beras dan gula merah." },
    ],
    budaya: [
      { name: "Rambu Solo", description: "Upacara pemakaman adat yang sangat meriah dan membutuhkan biaya besar." },
      { name: "Tongkonan", description: "Rumah adat tradisional dengan atap melengkung menyerupai perahu." },
    ],
    wisata: [
      { name: "Kete Kesu", description: "Desa tradisional dengan barisan rumah Tongkonan yang tertata rapi." },
      { name: "Londa", description: "Kompleks kuburan batu di tebing tinggi yang alami." },
      { name: "Lolai", description: "Kawasan pegunungan yang dijuluki 'Negeri di Atas Awan'." },
    ],
  }
];

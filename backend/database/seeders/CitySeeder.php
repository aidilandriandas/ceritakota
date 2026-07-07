<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Add sample city
        $cityId = DB::table('cities')->insertGetId([
            'slug' => 'payakumbuh',
            'name' => 'Payakumbuh',
            'province' => 'Sumatera Barat',
            'geo_name' => 'Payakumbuh',
            'tagline' => 'Kota Gelamai di Jantung Minangkabau',
            'description' => 'Payakumbuh adalah salah satu kota terpenting di Sumatera Barat...',
            'image' => 'https://images.unsplash.com/photo-1549474136-22a84d4ab375?w=1600&q=80',
            'coordinates' => '100.6334,-0.2159',
            'scale' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Add sample category items
        $categories = [
            ['type' => 'SEJARAH', 'name' => 'Sejarah Payakumbuh', 'description' => 'Payakumbuh, sering dijuluki sebagai \'Kota Gelamai\', adalah salah satu kota terpenting di Sumatera Barat. Berada di kawasan luak 50 (Luhak Limopuluah), kota ini tidak hanya menjadi pusat pertumbuhan ekonomi di wilayah timur Sumatera Barat, tetapi juga menyimpan peradaban tua kebudayaan Minangkabau.'],
            ['type' => 'KULINER', 'name' => 'Rendang Runtiah', 'description' => 'Varian unik rendang dari Payakumbuh yang disuwir halus, menawarkan tekstur renyah dan bumbu rempah yang sangat meresap.'],
            ['type' => 'KULINER', 'name' => 'Galamai', 'description' => 'Camilan khas mirip dodol yang kenyal, manis, dan dibuat dari tepung beras ketan, gula aren, dan santan kelapa.'],
            ['type' => 'BUDAYA', 'name' => 'Pacu Itiak', 'description' => 'Tradisi unik balapan itik terbang yang hanya dapat ditemui di wilayah Payakumbuh dan sekitarnya.'],
            ['type' => 'BUDAYA', 'name' => 'Seni Randai', 'description' => 'Teater tradisional Minangkabau yang menggabungkan seni bela diri (silek), tarian, musik, dan sastra lisan.'],
            ['type' => 'WISATA', 'name' => 'Lembah Harau', 'description' => 'Meski secara administratif sebagian masuk Kabupaten Limapuluh Kota, Lembah Harau dengan tebing granit setinggi 100-500 meter adalah ikon pariwisata yang sangat melekat dengan Payakumbuh.'],
            ['type' => 'WISATA', 'name' => 'Bukit Kelinci', 'description' => 'Destinasi wisata keluarga dengan nuansa alam perbukitan yang sejuk dan asri, dilengkapi dengan peternakan kelinci yang lucu.'],
            ['type' => 'TEKNOLOGI', 'name' => 'Payakumbuh Smart City', 'description' => 'Implementasi sistem digitalisasi terpadu untuk pelayanan publik, pemantauan CCTV lalu lintas real-time, dan akses WiFi gratis di ruang publik.'],
        ];

        foreach ($categories as $category) {
            DB::table('category_items')->insert([
                'type' => $category['type'],
                'name' => $category['name'],
                'description' => $category['description'],
                'city_id' => $cityId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}

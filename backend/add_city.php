<?php
require __DIR__.'/vendor/autoload.php';

use App\Models\City;
use App\Models\CategoryItem;

$city = City::create([
    'slug' => 'payakumbuh-baru',
    'name' => 'Payakumbuh Baru',
    'province' => 'Sumatera Barat',
    'geo_name' => 'Payakumbuh Baru',
    'tagline' => 'Kota Baru di Sumatera Barat',
    'description' => 'Kota baru yang sedang berkembang di wilayah Sumatera Barat.',
    'image' => 'https://images.unsplash.com/photo-1551021397-86e22f1be193?w=1600&q=80',
    'coordinates' => '100.6400,-0.2200',
    'scale' => 1,
    'created_at' => date('Y-m-d H:i:s'),
    'updated_at' => date('Y-m-d H:i:s'),
]);

echo 'Created city with ID: ' . $city->id . "\n";

// Add sample category items
$categories = [
    ['type' => 'SEJARAH', 'name' => 'Sejarah Payakumbuh Baru', 'description' => 'Payakumbuh Baru adalah kota baru yang sedang berkembang...', 'city_id' => $city->id],
    ['type' => 'KULINER', 'name' => 'Rendang Payakumbuh Baru', 'description' => 'Rendang khas Payakumbuh Baru yang disuwir halus...', 'city_id' => $city->id],
    ['type' => 'WISATA', 'name' => 'Lokasi Wisata Baru', 'description' => 'Lokasi wisata baru di Payakumbuh Baru...', 'city_id' => $city->id],
];

foreach ($categories as $category) {
    CategoryItem::create([
        'type' => $category['type'],
        'name' => $category['name'],
        'description' => $category['description'],
        'city_id' => $category['city_id'],
        'created_at' => date('Y-m-d H:i:s'),
        'updated_at' => date('Y-m-d H:i:s'),
    ]);
}
echo "Added category items\n";
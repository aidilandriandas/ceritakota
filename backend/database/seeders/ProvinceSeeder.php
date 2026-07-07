<?php

namespace Database\Seeders;

use App\Models\Province;
use Illuminate\Database\Seeder;

class ProvinceSeeder extends Seeder
{
    public function run(): void
    {
        $provinces = [
            [
                'name' => 'Sumatera Barat',
                'slug' => 'sumatera-barat',
                'geo_name' => 'SUMATERA BARAT',
                'description' => 'Provinsi Sumatera Barat',
                'capital' => 'Padang',
                'area' => '42,127 km²',
                'population' => '5,175,500 jiwa',
                'center_lat' => -0.954,
                'center_lng' => 100.46,
                'scale' => 22000,
            ],
            [
                'name' => 'Sumatera Utara',
                'slug' => 'sumatera-utara',
                'geo_name' => 'SUMATERA UTARA',
                'description' => 'Provinsi Sumatera Utara',
                'capital' => 'Medan',
                'area' => '72,981 km²',
                'population' => '13,107,000 jiwa',
                'center_lat' => 2.1945,
                'center_lng' => 99.2431,
                'scale' => 22000,
            ],
        ];

        foreach ($provinces as $province) {
            Province::firstOrCreate(
                ['slug' => $province['slug']],
                $province
            );
        }
    }
}

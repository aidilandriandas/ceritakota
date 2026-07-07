<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@ceritakota.id'],
            [
                'name' => 'Admin CeritaKota',
                'email' => 'admin@ceritakota.id',
                'password' => Hash::make('admin123'),
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'user@ceritakota.id'],
            [
                'name' => 'User Demo',
                'email' => 'user@ceritakota.id',
                'password' => Hash::make('user123'),
                'email_verified_at' => now(),
            ]
        );
    }
}

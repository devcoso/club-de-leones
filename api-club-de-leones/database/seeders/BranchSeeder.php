<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class BranchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('branches')->insert([
            [
                'name' => 'Club de Leones de Cardenas',
                'location' => 'Eje Central Lázaro Cárdenas 31, Cuauhtémoc, 06720 Ciudad de México, CDMX',
                'phone_number' => '55 5535 3933',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Club de Leones de Coyoacán',
                'location' => 'Av. División del Norte 3395, Coyoacán, 04650 Ciudad de México, CDMX',
                'phone_number' => '55 5554 0000',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Club de Leones de Tlalpan',
                'location' => 'Av. Insurgentes Sur 3000, Tlalpan, 14000 Ciudad de México, CDMX',
                'phone_number' => '55 5555 5555',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Club de Leones de Xochimilco',
                'location' => 'Av. Guadalupe I. Ramírez 4, Xochimilco, 16070 Ciudad de México, CDMX',
                'phone_number' => '55 5555 5555',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Club de Leones de Benito Juárez',
                'location' => 'Av. División del Norte 3395, Benito Juárez, 03100 Ciudad de México, CDMX',
                'phone_number' => '55 5555 5555',
                'created_at' => now(),
                'updated_at' => now(),
                ]
        ]);
    }
}

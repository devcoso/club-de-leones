<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\EventManager;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(EventTypeSeeder::class);
        $this->call(BranchSeeder::class);
        User::factory()->create([
            'name' => 'José David',
            'email' => 'admin@admin.com',
            'password' => bcrypt('12345678'),
            'created_at' => now(),
            'updated_at' => now(),
            'paternal_last_name' => 'Medina',
            'maternal_last_name' => 'Paredes',
            'phone_number' => '1234567890',
            'birthdate' => '2000-01-01',
            'sex' => '1',
            'user_type' => 2,
        ]);
        User::factory(100)->create();
        $this->call(EventSeeder::class);
        EventManager::factory(100)->create();
    }
}

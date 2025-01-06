<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\EventManager;
use App\Models\UserTrainer;
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
            'birthdate' => '2003-10-27',
            'sex' => '1',
            'user_type' => 2,
        ]);
        User::factory()->create([
            'name' => 'Armandito',
            'email' => 'user@user.com',
            'user_type' => 1,
            'birthdate' => '1940-06-23',
        ]);
        User::factory()->create([
            'name' => 'Vicio',
            'email' => 'user1@user.com',
            'user_type' => 1,
            'birthdate' => '2003-07-23',
        ]);
        User::factory()->create([
            'name' => 'Pablito',
            'email' => 'trainer@trainer.com',
            'user_type' => 3,
            'birthdate' => '2003-03-20',
        ]);
        User::factory(100)->create();
        $this->call(EventSeeder::class);
        EventManager::factory(50)->create();
        UserTrainer::factory(200)->create();
    }
}

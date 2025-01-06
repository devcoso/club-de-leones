<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\UserTrainer;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserTrainer>
 */
class UserTrainerFactory extends Factory
{
    protected $model = UserTrainer::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->randomElement(['Entrenador de natación', 'Entrenador de futbol', 'Entrenador de basquetbol', 'Entrenador de tenis']),
            'trainer_id' => User::where('user_type', 3)->get()->random()->id,
            'user_id' => User::where('user_type', 1)->get()->random()->id,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}

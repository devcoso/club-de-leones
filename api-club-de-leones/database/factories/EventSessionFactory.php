<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Event;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EventSession>
 */
class EventSessionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::where('user_type', 3)->get()->random()->id,
            'event_id' => Event::all()->random()->id,
            'participated_at' => $this->faker->dateTime(),
            'duration' => $this->faker->time(),
            'notes' => $this->faker->text(),
        ];
    }
}

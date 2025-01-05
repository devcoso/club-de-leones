<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\EventManager;
use App\Models\User;
use App\Models\Event;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class EventManagerFactory extends Factory
{
    protected $model = EventManager::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // Solo usuarios tipo 3 pueden ser managers de eventos
            'user_id' => User::where('user_type', 3)->get()->random()->id,
            'event_id' => Event::all()->random()->id,
        ];
    }
}

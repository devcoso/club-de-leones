<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'password' => static::$password ??= Hash::make('12345678'),
            'created_at' => now(),
            'updated_at' => now(),
            'paternal_last_name' => fake()->lastName(),
            'maternal_last_name' => fake()->lastName(),
            'phone_number' => fake()->phoneNumber(),
            'birthdate' => fake()->date(),
            'sex' => fake()->randomElement(['1', '2']),
            'user_type' => fake()->randomElement(['1', '1' , '1', '1', '1' , '1', '1', '3']),
            'tshirt_size' => fake()->randomElement(['XS', 'S', 'M', 'L', 'XL', 'XXL']),
            'branch_id' => fake()->randomElement([1, 2, 3, 4, 5, 6]),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}

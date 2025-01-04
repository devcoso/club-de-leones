<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EventTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('event_types')->insert([
            [
                'name' => 'Acuatlón Bajo Techo',
                'description' => 'Incluye natación y carrera en cinta.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Rodada In-Doors',
                'description' => 'Ciclismo en espacios cerrados.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Carrera 5K',
                'description' => 'Modalidad en cinta o exterior.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Corre en Cinta',
                'description' => 'Actividad de running en cinta.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Triatlón In-Doors',
                'description' => 'Competencia de natación, ciclismo y carrera bajo techo.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Maratón de Nado con Aletas',
                'description' => 'Evento de nado con equipo especializado.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Maratón de Nado con Snorkel',
                'description' => 'Competencia de nado con snorkel.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Macro-Zumba',
                'description' => 'Clase masiva de zumba.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Clase de Cortesía',
                'description' => 'Eventos especiales del día del Adulto Mayor, Padre o Madre.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Exhibición Infantil',
                'description' => 'Avances de bebés e infantiles hasta 4 años.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Festivales de Clasificación Técnica',
                'description' => 'Categoría de niños.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'La Clase de Natación Más Grande del Mundo',
                'description' => 'Evento masivo de natación.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

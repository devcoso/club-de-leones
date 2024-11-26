<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Agregar columnas nuevas
            $table->string('paternal_last_name');
            $table->string('maternal_last_name');
            $table->string('phone_number');
            $table->date('birthdate');
            $table->smallInteger('sex');
            $table->string('tshirt-size')->nullable();
            $table->smallInteger('type')->default(1);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Eliminar columnas
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('paternal_last_name');
            $table->dropColumn('maternal_last_name');
            $table->dropColumn('phone_number');
            $table->dropColumn('birthdate');
            $table->dropColumn('sex');
            $table->dropColumn('tshirt-size');
            $table->dropColumn('type');
        });
    }
};

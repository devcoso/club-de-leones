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
            // Agregar la columna 'branch_id' como opcional
            $table->unsignedBigInteger('branch_id')->nullable();

            // Definir la clave foránea
            $table->foreign('branch_id')
                  ->references('id')
                  ->on('branches')
                  ->onDelete('set null'); // Si se elimina la rama, el campo será NULL
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Eliminar columnas
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['branch_id']);
            $table->dropColumn('branch_id');
        });
    }
};

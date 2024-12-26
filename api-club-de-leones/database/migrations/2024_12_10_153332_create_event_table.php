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
        Schema::create('event', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description')->nullable();
            $table->timestamp('start_date');
            $table->timestamp('end_date');
            $table->decimal('sign_up_fee', 10, 2);
            $table->timestamp('sign_up_deadline');
            $table->smallInteger("min_age");
            $table->smallInteger("max_age");
            $table->smallInteger("max_participants");
            $table->foreignId('branch_id')->constrained("branches");
            $table->foreignId('category_id')->constrained("event_category");
            $table->foreignId('created_by')->constrained("users");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event');
    }
};

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
        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->string('prefix');              // คำนำหน้า
            $table->string('first_name');          // ชื่อ
            $table->string('last_name');           // นามสกุล
            $table->date('birthdate');             // วันเกิด
            $table->string('profile_image')->nullable(); // รูปโปรไฟล์ (เป็น path เช่น /images/xxx.jpg)
            $table->timestamps();                  // created_at, updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};
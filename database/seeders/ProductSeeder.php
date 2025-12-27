<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::insert([
            [
                'name' => 'iPhone 15',
                'price' => 79999,
                'stock_quantity' => 10,
            ],
            [
                'name' => 'MacBook Pro',
                'price' => 199999,
                'stock_quantity' => 3,
            ],
            [
                'name' => 'AirPods Pro',
                'price' => 24999,
                'stock_quantity' => 15,
            ],
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Jobs\LowStockAlertJob;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function complete(Request $request)
    {
        foreach ($request->items as $item) {
                $product = Product::find($item['id']);

                if (!$product) {
                    continue; // skip if product not found
                }

                $product->decrement('stock_quantity', $item['quantity']);

                if ($product->stock <= 5) { // low stock threshold
                    LowStockAlertJob::dispatch($product);
                }
        }
        $request->user()->cartItems()->delete();
        return redirect()->route('order.success')->with('success', 'Your order has been placed successfully!');
    }
}

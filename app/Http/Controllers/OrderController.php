<?php

namespace App\Http\Controllers;

use App\Jobs\LowStockAlertJob;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    public function complete(Request $request)
    {
        foreach ($request->items as $item) {

            $cartItem = CartItem::find($item['cart_item_id']);

            if (!$cartItem) {
                continue;
            }

            $product = Product::find($cartItem->product_id);

            if ($product->stock_quantity < $item['quantity']) {
                return redirect()->back()->with('error', 'Insufficient stock for ' . $product->name);
            }

            if (!$product) {
                continue;
            }

            // Reduce stock
            $product->decrement('stock_quantity', $item['quantity']);

            if ($product->stock_quantity <= 5) { // low stock threshold
                LowStockAlertJob::dispatch($product);
            }
        }

        // Clear user's cart
        $request->user()->cartItems()->delete();

        return redirect()
            ->route('order.success')
            ->with('success', 'Your order has been placed successfully!');
    }
}

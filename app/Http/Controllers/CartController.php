<?php

namespace App\Http\Controllers;

use App\Jobs\LowStockAlertJob;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index(Request $request)
    {
        $items = CartItem::with('product')
            ->where('user_id', $request->user()->id)
            ->get();

        return Inertia::render('Cart/Index', [
            'cart' => [
                'items' => $items,
            ],
        ]);
    }

    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $product = Product::findOrFail($request->product_id);

        if ($product->stock_quantity <= 0) {
            return back()->withErrors(['stock' => 'Out of stock']);
        }

        $item = CartItem::where('user_id', auth()->id())
            ->where('product_id', $product->id)
            ->first();

        if ($item) {
            $item->increment('quantity');
        } else {
            CartItem::create([
                'user_id' => auth()->id(),
                'product_id' => $product->id,
                'quantity' => 1,
            ]);
        }

        $product->decrement('stock_quantity');

        return back();
    }

    public function update(Request $request, CartItem $item)
    {
        $qty = (int) $request->quantity;

        if ($qty <= 0) {
            $item->delete();
            return back();
        }

        $diff = $qty - $item->quantity;
        $item->product->decrement('stock_quantity', $diff);

        $item->update(['quantity' => $qty]);

        return back();
    }

    public function remove(CartItem $item)
    {
        abort_if($item->user_id !== auth()->id(), 403);

        $item->product->increment('stock_quantity', $item->quantity);
        $item->delete();

        return redirect()->back();
    }


    public function updateAll(Request $request)
    {
        foreach ($request->quantities as $itemId => $qty) {
            $item = CartItem::where('id', $itemId)
                ->where('user_id', auth()->id())
                ->first();

            if (!$item) continue;

            $currentQty = $item->quantity;

            if ($qty <= 0) {
                // restore stock
                $item->product->increment('stock_quantity', $currentQty);
                $item->delete();
            } else {
                $diff = $qty - $currentQty;

                if ($diff > 0) {
                    $item->product->decrement('stock_quantity', $diff);
                } else {
                    $item->product->increment('stock_quantity', abs($diff));
                }

                $item->update(['quantity' => $qty]);

            }
        }

        return redirect()->back();
    }

}

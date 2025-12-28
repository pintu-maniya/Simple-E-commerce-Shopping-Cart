import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import {Head, router} from '@inertiajs/react';

export default function Cart({ cart }) {
    const [quantities, setQuantities] = useState(
        Object.fromEntries(
            cart.items.map(item => [item.id, String(item.quantity)])
        )
    );

    const updateCart = () => {
        const payload = {};

        Object.keys(quantities).forEach(itemId => {
            payload[itemId] =
                quantities[itemId] === '' ? 0 : parseInt(quantities[itemId], 10);
        });

        router.patch(route('cart.update.all'), {
            quantities: payload,
        });
    };

    const completeOrder = () => {
        const orderPayload = Object.keys(quantities).map(cartItemId => ({
            cart_item_id: cartItemId,
            quantity: parseInt(quantities[cartItemId], 10),
        }));

        router.post(route('order.complete'), { items: orderPayload });
    };

    return (
        <AppLayout>
            <Head title="Cart" />
            <div className="max-w-4xl mx-auto py-10">
                <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

                {cart.items.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">
                            Your cart is empty 🛒
                        </p>

                        <a
                            href="/"
                            className="inline-block mt-4 text-indigo-600 hover:underline"
                        >
                            Continue shopping
                        </a>
                    </div>
                ) : (
                    <>
                        {cart.items.map(item => (
                            <div
                                key={item.id}
                                className="flex items-center gap-4 mb-4 border-b pb-3"
                            >
                                <p className="flex-1">{item.product.name}</p>

                                <input
                                    type="number"
                                    min="0"
                                    value={quantities[item.id]}
                                    onChange={e =>
                                        setQuantities({
                                            ...quantities,
                                            [item.id]: e.target.value,
                                        })
                                    }
                                    className="border w-20 px-2 py-1 rounded"
                                />

                                <button
                                    onClick={() =>
                                        router.delete(route('cart.remove', item.id))
                                    }
                                    className="text-red-600 hover:underline"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}

                        {/* UPDATE BUTTON ONLY WHEN ITEMS EXIST */}
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={updateCart}
                                className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
                            >
                                Update Cart
                            </button>

                            <button
                                onClick={completeOrder}
                                className="ml-5 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                            >
                                Complete Order
                            </button>

                        </div>
                    </>
                )}
            </div>
        </AppLayout>
    );
}

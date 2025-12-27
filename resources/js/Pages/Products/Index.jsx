import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function Index({ auth, products }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Products" />

            <div className="py-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map(product => (
                    <div key={product.id} className="border rounded p-4 shadow">
                        <h2 className="font-bold text-lg">{product.name}</h2>
                        <p className="text-gray-600">₹ {product.price}</p>
                        <p className="text-sm">Available Qty: {product.stock_quantity}</p>

                        <button
                            onClick={() =>
                                router.post(route('cart.add'), {
                                    product_id: product.id,
                                })
                            }
                            className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}

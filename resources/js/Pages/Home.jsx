import AppLayout from '@/Layouts/AppLayout';
import {Head, router, usePage} from '@inertiajs/react';

export default function Home({ products }) {
    const { auth } = usePage().props;

    const addToCart = (id) => {
        if (!auth.user) {
            alert('Please login first');
            router.visit('/login');
            return;
        }

        router.post(route('cart.add'), { product_id: id });
    };

    return (
        <AppLayout>
            <Head title="Home" />
            {/* Hero */}
            <div className="bg-indigo-600 text-white py-20 text-center">
                <h1 className="text-4xl font-bold">Best Online Store</h1>
                <p className="mt-2">Buy quality products</p>
            </div>

            {/* Products */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 py-12">
                {products.map(p => (
                    <div key={p.id} className="border rounded p-4">
                        <h2 className="font-bold">{p.name}</h2>
                        <p>₹ {p.price}</p>
                        <p className="text-sm">Available Qty: {p.stock_quantity}</p>
                        <button
                            onClick={() => addToCart(p.id)}
                            className="mt-3 bg-indigo-600 text-white w-full py-2 rounded"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}

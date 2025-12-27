import { usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function OrderSuccess() {
    const { flash } = usePage().props; // ✅ get flash from Inertia

    return (
        <AppLayout>
            <div className="max-w-2xl mx-auto py-20 text-center">
                {flash?.success && (
                    <div className="mb-6 bg-green-100 text-green-800 px-6 py-4 rounded">
                        {flash.success}
                    </div>
                )}
                <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
                <p>Your order has been placed successfully. 🛒</p>

                <a
                    href="/"
                    className="mt-6 inline-block text-indigo-600 hover:underline"
                >
                    Continue Shopping
                </a>
            </div>
        </AppLayout>
    );
}

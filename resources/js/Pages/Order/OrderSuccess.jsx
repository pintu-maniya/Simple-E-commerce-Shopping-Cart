import {Head, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function OrderSuccess() {

    return (
        <AppLayout>
            <Head title="Success" />
            <div className="max-w-2xl mx-auto py-20 text-center">
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

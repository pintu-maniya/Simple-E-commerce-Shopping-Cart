import { usePage, router } from '@inertiajs/react';
import Toast from '@/Components/Toast';

export default function AppLayout({ children }) {
    const { auth, cartProductCount } = usePage().props;
    const { flash } = usePage().props;

    return (
        <>
            <Toast message={flash?.success} type="success" />
            <Toast message={flash?.error} type="error" />

            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto flex items-center justify-between p-4">

                    {/* LEFT */}
                    <div className="flex items-center gap-6">
                        <a href="/" className="text-2xl font-bold">MyShop</a>
                        <a href="/" className="font-medium">Home</a>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-6">
                        {/* CART ICON */}
                        <a href="/cart" className="relative">
                            🛒
                            {cartProductCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                    {cartProductCount}
                                </span>
                            )}
                        </a>

                        {/* USER */}
                        {auth.user ? (
                            <div className="relative group">
                                <button className="font-medium">
                                    {auth.user.name}
                                </button>

                                <div className="absolute right-0 hidden group-hover:block bg-white shadow rounded p-2 min-w-[120px]">
                                    <a
                                        href="/profile"
                                        className="block px-3 py-1 hover:bg-gray-100 rounded"
                                    >
                                        Profile
                                    </a>

                                    <button
                                        onClick={() => router.post('/logout')}
                                        className="block w-full text-left px-3 py-1 hover:bg-gray-100 rounded text-red-600"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <a
                                    href="/login"
                                    className="font-medium text-gray-700 hover:text-indigo-600"
                                >
                                    Login
                                </a>

                                <a
                                    href="/register"
                                    className="font-medium text-indigo-600 hover:underline"
                                >
                                    Register
                                </a>
                            </div>
                        )}

                    </div>
                </div>
            </header>

            <main>{children}</main>
        </>
    );
}

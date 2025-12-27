import { Link, usePage, router } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    const { auth, cartCount } = usePage().props;

    return (
        <div>
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
                    <Link href="/" className="text-2xl font-bold">
                        MyShop
                    </Link>

                    <div className="flex items-center gap-6">
                        {/* Cart */}
                        <button
                            onClick={() =>
                                auth.user
                                    ? router.visit('/cart')
                                    : router.visit('/login')
                            }
                            className="relative"
                        >
                            🛒
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Auth */}
                        {auth.user ? (
                            <div className="relative group">
                                <button>{auth.user.name}</button>
                                <div className="absolute hidden group-hover:block bg-white shadow p-2 right-0">
                                    <Link href="/profile">Profile</Link>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="block mt-2"
                                    >
                                        Logout
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <Link href="/login">Login</Link>
                        )}
                    </div>
                </div>
            </header>

            {children}

            {/* Footer */}
            <footer className="bg-gray-900 text-white text-center p-6 mt-12">
                © 2025 MyShop
            </footer>
        </div>
    );
}

<?php

namespace App\Providers;

use App\Models\CartItem;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'auth' => fn () => [
                'user' => Auth::user(),
            ],

            'cartProductCount' => fn () => Auth::check()
                ? CartItem::where('user_id', Auth::id())->count()
                : 0,
            'flash' => function (Request $request) {
                return [
                    'success' => $request->session()->get('success'),
                    'error'   => $request->session()->get('error'),
                ];
            },
        ]);
    }
}

<?php

namespace App\Providers;

use App\Shortcodes as Component;
use Illuminate\Support\ServiceProvider;
use Vedmant\LaravelShortcodes\Facades\Shortcodes;

class ShortcodeServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Shortcodes::add([
            'announcements' => Component\Announcements::class,
            'products' => Component\Products::class
        ]);
    }
}

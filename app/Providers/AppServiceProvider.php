<?php

namespace App\Providers;

use Coderstm\Coderstm;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Relations\Relation;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Relation::morphMap([
            'User' => Coderstm::$userModel,
            'Admin' => Coderstm::$adminModel,
            'Address' => 'Coderstm\Models\Address',
            'Group' => 'Coderstm\Models\Group',
        ]);

        Gate::guessPolicyNamesUsing(function (string $modelClass) {
            // Replace 'Models' with 'Policies' in the namespace
            return str_replace('Models', 'Policies', $modelClass) . 'Policy';
        });
    }
}

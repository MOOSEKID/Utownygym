<?php

namespace App\Providers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class CoderstmRouteServiceProvider extends ServiceProvider
{
    /**
     * The path to the "home" route for your application.
     *
     * This is used by Laravel authentication to redirect users after login.
     *
     * @var string
     */
    public const HOME = '/';

    /**
     * The controller namespace for the application.
     *
     * When present, controller route declarations will automatically be prefixed with this namespace.
     *
     * @var string|null
     */
    // protected $namespace = 'App\\Http\\Controllers';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        $this->configureRateLimiting();

        $this->routes(function () {
            // modify default api route
            Route::prefix('api')
                ->middleware('api')
                ->namespace($this->namespace)
                ->group(base_path('routes/api.php'));

            if (file_exists(base_path('routes/coderstm/api.php'))) {
                Route::prefix('api')
                    ->middleware('api')
                    ->group(base_path('routes/coderstm/api.php'));
            }

            if (file_exists(base_path('routes/coderstm/web.php'))) {
                Route::prefix('admin')
                    ->middleware('web')
                    ->namespace($this->namespace)
                    ->group(base_path('routes/coderstm/web.php'));

                Route::prefix('user')
                    ->middleware('web')
                    ->namespace($this->namespace)
                    ->group(base_path('routes/coderstm/web.php'));
            }

            Route::middleware('web')
                ->domain(config('coderstm.domain'))
                ->namespace($this->namespace)
                ->group(base_path('routes/web.php'));
        });
    }

    /**
     * Configure the rate limiters for the application.
     *
     * @return void
     */
    protected function configureRateLimiting()
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60);
        });
    }
}

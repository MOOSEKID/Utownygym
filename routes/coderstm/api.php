<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KPIController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ChartsController;
use App\Http\Controllers\EnquiryController;
use Coderstm\Http\Controllers\LogController;
use Coderstm\Http\Controllers\TaxController;
use App\Http\Controllers\Auth\AuthController;
use Coderstm\Http\Controllers\BlogController;
use Coderstm\Http\Controllers\FileController;
use Coderstm\Http\Controllers\PageController;
use Coderstm\Http\Controllers\PlanController;
use Coderstm\Http\Controllers\TaskController;
use Coderstm\Http\Controllers\GroupController;
use Coderstm\Http\Controllers\ThemeController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\UserReportsController;
use Coderstm\Http\Controllers\NotificationController;
use Coderstm\Http\Controllers\PaymentMethodController;
use Coderstm\Http\Controllers\Payment\PaypalController;
use Coderstm\Http\Controllers\Payment\StripeController;
use Coderstm\Http\Controllers\Payment\RazorpayController;
use Coderstm\Http\Controllers\Auth\ForgotPasswordController;
use Coderstm\Http\Controllers\Subscription\CouponController;
use Coderstm\Http\Controllers\Subscription\SubscriptionController;
use Coderstm\Http\Controllers\Blog\TagController as BlogTagController;
use Coderstm\Http\Controllers\Page\BlockController as PageBlockController;
use Coderstm\Http\Controllers\Page\TemplateController as PageTemplateController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Auth Routes
Route::group([
    'as' => 'auth.',
    'prefix' => 'auth/{guard?}',
], function () {
    Route::controller(AuthController::class)->group(function () {
        Route::post('signup', 'signup')->name('signup');
        Route::post('login', 'login')->name('login');
        Route::middleware('auth:sanctum')->group(function () {
            Route::post('logout', 'logout')->name('logout');
            Route::post('update', 'update')->name('update');
            Route::post('change-password', 'password')->name('change-password');
            Route::post('me', 'me')->name('current');
            Route::post('request-account-deletion', 'requestAccountDeletion')->name('request-account-deletion');
            Route::post('add-device-token', 'addDeviceToken')->name('add-device-token');
        });
    });
    Route::group([
        'as' => 'password.',
        'controller' => ForgotPasswordController::class,
    ], function () {
        Route::post('request-password', 'request')->name('request');
        Route::post('reset-password', 'reset')->name('reset');
    });
});

// Core Routes
Route::middleware(['auth:sanctum', 'guard:admins'])->group(function () {
    // Notification templates
    Route::group([
        'as' => 'settings.notifications.',
        'prefix' => 'settings/notifications',
        'middleware' => 'can:update,Coderstm\Models\Notification',
        'controller' => NotificationController::class
    ], function () {
        Route::post('{notification}/mark-as-default', 'markAsDefault')->name('mark-as-default');
        Route::post('{notification}/duplicate', 'duplicate')->name('duplicate');
    });
    Route::apiResource('settings/notifications', NotificationController::class, [
        'as' => 'settings',
        'middleware' => 'can:update,Coderstm\Models\Notification',
        'only' => ['index', 'show', 'update', 'destroy']
    ]);

    // Application Settings
    Route::group([
        'as' => 'application.',
        'prefix' => 'application',
        'controller' => ApplicationController::class
    ], function () {
        Route::get('stats', 'stats')->name('stats');

        Route::get('editor-theme', [ApplicationController::class, 'theme'])->name('editor-theme');
        Route::get('short-code', 'shortCode')->middleware('web')->name('short-code');
        Route::post('test-mail-config', 'testMailConfig')->name('test-mail-config');
        Route::get('settings/{key}', 'getSettings')->name('get-settings');
        Route::middleware('can:update,Coderstm\Models\AppSetting')->group(function () {
            Route::post('settings', 'updateSettings')->name('update-settings');
        });
    });

    // Tasks
    Route::group([
        'prefix' => 'tasks',
        'as' => 'tasks.',
        'controller' => TaskController::class,
        'middleware' => 'can:update,task'
    ], function () {
        Route::post('{task}/reply', 'reply')->name('reply');
        Route::post('{task}/change-archived', 'changeArchived')->name('change-archived');
    });
    Route::resource('tasks', TaskController::class)->except([
        'update'
    ]);

    // Admins
    Route::group([
        'as' => 'admins.',
        'prefix' => 'admins',
        'controller' => AdminController::class,
    ], function () {
        Route::get('options', 'options')->name('options');
        Route::post('import', 'import')->name('import');
        Route::get('modules', 'modules')->name('modules');
        Route::group(['middleware' => 'can:update,admin'], function () {
            Route::post('{admin}/reset-password-request', 'resetPasswordRequest')->name('reset-password-request');
            Route::post('{admin}/change-active', 'changeActive')->name('change-active');
            Route::post('{admin}/change-admin', 'changeAdmin')->name('change-admin');
        });
    });
    Route::resource('admins', AdminController::class);

    // Groups
    Route::resource('groups', GroupController::class);

    // Logs
    Route::post('logs/{log}/reply', [LogController::class, 'reply'])->name('logs.reply');
    Route::resource('logs', LogController::class)->only([
        'show',
        'update',
        'destroy',
    ]);

    // App Payment Methods
    Route::group([
        'controller' => PaymentMethodController::class,
        'as' => 'payment-methods.',
        'prefix' => 'payment-methods',
    ], function () {
        Route::post('{payment_method}/disable', 'disable')->name('disable');
        Route::post('{payment_method}/enable', 'enable')->name('enable');
    });
    Route::resource('payment-methods', PaymentMethodController::class)->only([
        'index',
        'store',
        'show',
        'update',
    ]);
});

Route::middleware(['auth:sanctum'])->group(function () {
    // Files
    Route::post('files/upload-from-source', [FileController::class, 'uploadFromSource'])->name('files.upload-from-source');
    Route::resource('files', FileController::class)->except([
        'destroySelected',
        'restore',
        'restoreSelected',
    ]);

    // Enquiries
    Route::group([
        'controller' => EnquiryController::class,
        'middleware' => 'can:update,enquiry',
        'as' => 'enquiries.',
        'prefix' => 'enquiries',
    ], function () {
        Route::post('{enquiry}/reply', 'reply')->name('reply');
        Route::post('{enquiry}/change-user-archived', 'changeUserArchived')->name('change-user-archived');
        Route::post('{enquiry}/change-archived', 'changeArchived')->name('change-archived');
    });
    Route::resource('enquiries', EnquiryController::class);
});

// Common Routes
Route::middleware(['auth:sanctum'])->group(function () {
    // Subscription
    Route::group([
        'as' => 'subscription.',
        'prefix' => 'subscription',
        'controller' => SubscriptionController::class,
    ], function () {
        Route::get('', 'index')->name('index');
        Route::post('subscribe', 'subscribe')->name('subscribe');
        Route::post('resume', 'resume')->name('resume');
        Route::post('pay', 'pay')->name('pay');
        Route::post('cancel-downgrade', 'cancelDowngrade')->name('cancel-downgrade');
        Route::post('invoices', 'invoices')->name('invoices');
        Route::get('invoices/{invoice}', 'downloadInvoice')->name('invoices.download');
        Route::post('cancel', 'cancel')->name('cancel');
    });
});

// Admin Routes
Route::middleware(['auth:sanctum', 'guard:admins'])->group(function () {
    // Users
    Route::group(['prefix' => 'users', 'as' => 'users.'], function () {
        Route::group(['controller' => UserReportsController::class, 'prefix' => 'reports', 'as' => 'reports.'], function () {
            Route::get('/', 'index')->can('reports,App\Models\User')->name('index');
            Route::get('daily', 'reportsDaily')->can('reportsDaily,App\Models\User')->name('daily');
            Route::get('monthly', 'reportsMonthly')->can('reportsMonthly,App\Models\User')->name('monthly');
            Route::get('yearly', 'reportsYearly')->can('reportsYearly,App\Models\User')->name('yearly');
            Route::post('pdf', 'pdf')->can('reportsDaily,App\Models\User')->name('pdf');
        });
        Route::group(['controller' => UserController::class], function () {
            Route::post('options', 'options')->name('options');
            Route::post('import', 'import')->name('import');
            Route::post('list-by-ids', 'listByIds')->name('list-by-ids');
            Route::get('show-by-qrcode/{qrcode}', 'showByQrcode')->name('show-by-qrcode');
            Route::get('enquiry', 'enquiry')->can('enquiry,App\Models\User')->name('enquiry');
            Route::post('{user}/change-active', 'changeActive')->name('change-active');
            Route::post('{user}/notes', 'notes')->name('notes');
            Route::post('{user}/mark-as-paid', 'markAsPaid')->name('mark-as-paid');
            Route::post('{user}/reset-password-request', 'resetPasswordRequest')->name('reset-password-request');
        });
    });
    Route::resource('users', UserController::class);

    // Plans
    Route::group([
        'as' => 'plans.',
        'prefix' => 'plans',
        'middleware' => 'can:update,plan',
    ], function () {
        Route::post('{plan}/change-active', [PlanController::class, 'changeActive'])->name('change-active');
    });
    Route::resource('plans', PlanController::class);

    // Coupons
    Route::group([
        'as' => 'coupons.',
        'prefix' => 'coupons',
        'middleware' => 'can:update,coupon',
    ], function () {
        Route::post('{coupon}/change-active', [CouponController::class, 'changeActive'])->name('change-active');
    });
    Route::resource('coupons', CouponController::class);

    // Taxes
    Route::resource('taxes', TaxController::class)->only([
        'index',
        'store',
        'update',
        'destroy'
    ]);

    // Blogs
    Route::group([
        'as' => 'blogs.',
        'prefix' => 'blogs',
    ], function () {
        Route::resource('tags', BlogTagController::class, [
            'middleware' => [
                'can:create,Coderstm\Models\Blog',
                'can:update,Coderstm\Models\Blog',
            ]
        ])->only(['index', 'store']);

        Route::group([
            'middleware' => 'can:update,blog',
            'controller' => BlogController::class,
        ], function () {
            Route::post('{blog}/change-active', 'changeActive')->name('change-active');
            Route::post('{blog}/comments', 'comments')->name('comments');
        });
    });
    Route::resource('blogs', BlogController::class);

    // Pages
    Route::group([
        'as' => 'pages.',
        'prefix' => 'pages',
    ], function () {
        Route::group([
            'as' => 'templates.',
            'controller' => PageTemplateController::class
        ], function () {
            Route::get('templates', 'index')->name('index');
            Route::post('templates', 'store')->name('store');
            Route::get('templates/{template}', 'show')->name('show');
            Route::delete('templates/{template}', 'destroy')->name('destroy');
        });

        Route::group([
            'as' => 'blocks.',
            'controller' => PageBlockController::class
        ], function () {
            Route::get('blocks', 'index')->name('index');
            Route::post('blocks', 'store')->name('store');
            Route::delete('blocks/{block}', 'destroy')->name('destroy');
        });

        Route::group([
            // 'middleware' => 'can:update,page',
            'controller' => PageController::class,
        ], function () {
            Route::post('{page}/change-active', 'changeActive')->name('change-active');
        });
    });
    Route::resource('pages', PageController::class);

    // Charts
    Route::group([
        'controller' => ChartsController::class,
        'prefix' => 'charts',
        'as' => 'charts.',
    ], function () {
        Route::get('user-growth', 'userGrowth')->name('user-growth');
        Route::get('members-breakdown', 'membersBreakdown')->name('members-breakdown');
        Route::get('revenue-breakdown', 'revenueBreakdown')->name('revenue-breakdown');
        Route::get('retention-rate', 'retentionRate')->name('retention-rate');
        Route::get('attendance-utilization', 'attendanceUtilization')->name('attendance-utilization');
        Route::get('revenue-trends', 'revenueTrends')->name('revenue-trends');
        Route::get('source-revenue-trends', 'revenueTrendsBySource')->name('source-revenue-trends');
        Route::get('check-in', 'checkIns')->name('check-in');
    });

    // KPI
    Route::group(['prefix' => 'kpi', 'as' => 'kpi.'], function () {
        Route::get('new-members', [KPIController::class, 'newMembers'])->name('new-members');
        Route::get('visits-today', [KPIController::class, 'visitsToday'])->name('visits-today');
        Route::get('member-visits', [KPIController::class, 'memberVisitsThisMonth'])->name('member-visits');
        Route::get('bookings', [KPIController::class, 'bookingsThisMonth'])->name('bookings');
        Route::get('online-signups', [KPIController::class, 'onlineSignupsThisMonth'])->name('online-signups');
        Route::get('online-bookings', [KPIController::class, 'onlineBookingsThisMonth'])->name('online-bookings');
    });

    Route::group(['prefix' => 'themes', 'as' => 'themes.'], function () {
        Route::get('/', [ThemeController::class, 'index'])->name('index');
        Route::post('/{theme}/active', [ThemeController::class, 'activate'])->name('activate');
        Route::delete('/{theme}/destroy', [ThemeController::class, 'destroy'])->name('destroy');
        Route::post('/{theme}/clone', [ThemeController::class, 'clone'])->name('clone');
        Route::post('/{theme}/assets', [ThemeController::class, 'assetsUpload'])->name('assets');

        Route::group(['prefix' => '{theme}/files'], function () {
            Route::get('/', [ThemeController::class, 'getFiles'])->name('files.list');
            Route::post('/', [ThemeController::class, 'saveFile'])->name('files.save');
            Route::post('/create', [ThemeController::class, 'createFile'])->name('files.create');
            Route::get('/content', [ThemeController::class, 'getFileContent'])->name('files.content');
            Route::delete('/destroy', [ThemeController::class, 'destroyThemeFile'])->name('files.destroy');
        });
    });
});

Route::group(['prefix' => 'shared'], function () {
    Route::get('plans', [PlanController::class, 'shared'])->name('plans.shared');
    Route::get('plans/features', [PlanController::class, 'features'])->name('plans.features');
});

Route::post('subscription/check-promo-code', [SubscriptionController::class, 'checkPromoCode'])->name('subscription.check-promo-code');

Route::group(['controller' => ApplicationController::class, 'prefix' => 'application', 'as' => 'application.'], function () {
    Route::get('location', 'location')->name('location');
    Route::get('config', 'config')->name('config');
    Route::get('payment-methods', 'paymentMethods')->name('payment-methods');
});

// Wehbooks
Route::post('stripe/webhook', [StripeController::class, 'webhook'])->name('stripe.webhook');
Route::post('paypal/webhook', [PaypalController::class, 'webhook'])->name('paypal.webhook');
Route::post('razorpay/webhook', [RazorpayController::class, 'webhook'])->name('razorpay.webhook');

// Payments
Route::group(['prefix' => 'payment', 'as' => 'payment.'], function () {
    Route::group(['controller' => StripeController::class, 'prefix' => 'stripe', 'as' => 'stripe.'], function () {
        Route::get('token', 'token')->name('token');
        Route::get('success', 'success')->name('success');
        Route::post('process', 'process')->name('process');
    });
    Route::group(['controller' => PaypalController::class, 'prefix' => 'paypal', 'as' => 'paypal.'], function () {
        Route::get('token', 'token')->name('token');
        Route::get('success', 'success')->name('success');
        Route::post('process', 'process')->name('process');
    });
    Route::group(['controller' => RazorpayController::class, 'prefix' => 'razorpay', 'as' => 'razorpay.'], function () {
        Route::get('token', 'token')->name('token');
        Route::get('success', 'success')->name('success');
        Route::post('process', 'process')->name('process');
    });
});

Route::get('/themes/{theme}/assets', [ThemeController::class, 'assets'])->name('themes.assets.preview');
Route::get('/qrcode/{user}.png', [UserController::class, 'qrcode'])->name('users.qrcode');

<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\GuestPassController;
use App\Http\Controllers\User\OrderController;
use App\Http\Controllers\User\BookingController;
use App\Http\Controllers\Admin\LocationController;
use App\Http\Controllers\Admin\TemplateController;
use App\Http\Controllers\Admin\ClassListController;
use App\Http\Controllers\Admin\InstructorController;
use App\Http\Controllers\Admin\AnnouncementController;
use App\Http\Controllers\Admin\WeekScheduleController;
use App\Http\Controllers\Admin\Shop\ProductController;
use App\Http\Controllers\Admin\WeekTemplateController;
use App\Http\Controllers\Admin\ClassScheduleController;
use App\Http\Controllers\Admin\QuestionnaireController;
use App\Http\Controllers\Admin\Shop\Product\AttributeController;
use App\Http\Controllers\Admin\Shop\Product\CategoryController;
use App\Http\Controllers\Admin\Shop\Product\CollectionController;
use App\Http\Controllers\Admin\Shop\Product\InventoryController;
use App\Http\Controllers\Admin\Shop\Product\OptionController;
use App\Http\Controllers\Admin\Shop\Product\TagController;
use App\Http\Controllers\Admin\Shop\Product\VariantController;
use App\Http\Controllers\Admin\Shop\Product\VendorController;
use App\Http\Controllers\GateCloudController;
use App\Http\Controllers\Admin\Shop\CustomerController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\User\ShopController as UserShopController;
use App\Http\Controllers\Admin\Shop\LocationController as ShopLocationController;
use App\Http\Controllers\Admin\Shop\OrderController as ShopOrderController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\User\ClassScheduleController as UserClassScheduleController;

/* CONTROLLERS */
/* Don't remove the placeholder `CONTROLLERS` */

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
    'middleware' => 'auth:sanctum',
    'controller' => AuthController::class,
], function () {
    Route::post('update-parq', 'updateParq')->name('update-parq');
});

Route::group([
    'as' => 'shop.orders.',
    'controller' => ShopController::class
], function () {
    Route::group(['prefix' => 'orders'], function () {
        Route::post('calculator', 'calculator')->name('calculator');
        Route::post('{payment_method}/checkout', 'checkout')->name('checkout');
        Route::post('{order}/{payment_method}/pay', 'pay')->name('pay');
    });
    Route::get('shop/cart', 'cart')->name('cart');
});

// Common Routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    // Options
    Route::group(['as' => 'options.'], function () {
        Route::get('users/options', [UserController::class, 'options'])->name('users');
        Route::get('class-lists/options', [ClassListController::class, 'options'])->name('class-lists');
        Route::get('locations/options', [LocationController::class, 'options'])->name('locations');
        Route::get('instructors/options', [InstructorController::class, 'options'])->name('instructors');
    });

    //User Schedules
    Route::group([
        'as' => 'users.',
        'prefix' => 'users',
        'middleware' => 'can:view,user',
        'controller' => UserController::class
    ], function () {
        Route::get('{user}/schedules', 'schedules')->name('schedules');
        Route::get('{user}/schedules-calendar', 'schedulesCalendar')->name('schedules-calendar');
    });
});

// Admin Routes
Route::group(['middleware' => ['auth:sanctum', 'guard:admins']], function () {
    // Finance
    Route::group(['prefix' => 'finance', 'as' => 'finance.'], function () {
        Route::get('memberships', [UserController::class, 'financeMemberships'])->can('membership,App\Models\User')->name('memberships');
    });

    // Admins
    Route::group(['middleware' => 'can:update,admin', 'prefix' => 'admins', 'as' => 'admins.'], function () {
        Route::post('{admin}/change-instructor', [AdminController::class, 'changeInstructor'])->name('change-instructor');
    });

    // Users
    Route::group(['prefix' => 'users', 'as' => 'users.'], function () {
        Route::group(['controller' => UserController::class], function () {
            Route::get('enquiry', 'enquiry')->can('enquiry,App\Models\User')->name('enquiry');
            Route::group(['middleware' => 'can:update,user'], function () {
                Route::post('{user}/change-block', 'changeBlock')->name('change-block');
                Route::post('{user}/request-avatar', 'requestAvatar')->name('request-avatar');
                Route::post('{user}/request-parq', 'requestParq')->name('request-parq');
            });
        });
    });

    // Classes
    Route::group([
        'as' => 'class-lists.',
        'prefix' => 'class-lists',
        'controller' => ClassListController::class,
        'middleware' => 'can:update,class_list'
    ], function () {
        Route::post('{class_list}/change-active', 'changeActive')->name('change-active');
        Route::post('{class_list}/change-has-description', 'changeHasDescription')->name('change-has-description');
    });
    Route::resource('class-lists', ClassListController::class);

    // Class Schedules
    Route::group([
        'as' => 'class-schedules.',
        'prefix' => 'class-schedules',
        'controller' => ClassScheduleController::class,
        'middleware' => 'can:update,App\Models\ClassSchedule',
    ], function () {
        Route::get('weekly', 'index')->name('weekly');
        Route::post('weekly/update', 'store')->name('weekly.update');
    });
    Route::group([
        'controller' => WeekScheduleController::class,
        'as' => 'class-schedules.',
        'prefix' => 'class-schedules'
    ], function () {
        Route::get('/calendar', 'calendar')->can('viewAny,App\Models\ClassSchedule')->name('calendar');
        Route::get('/list-pdf', 'listPdf')->can('viewAny,App\Models\ClassSchedule')->name('list-pdf');
        Route::get('/{class_schedule}/pdf', 'pdf')->name('pdf');
        Route::post('/{class_schedule}/change-sign-off', 'changeSignOff')->name('change-sign-off');
        Route::post('/{class_schedule}/logs', 'logs')->name('logs');
    });
    Route::resource('class-schedules', WeekScheduleController::class)->only([
        'index',
        'show',
        'update'
    ]);

    // Week Template
    Route::resource('week-templates', WeekTemplateController::class)->only([
        'index',
        'store'
    ]);

    // Locations
    Route::middleware('can:update,location')->group(function () {
        Route::post('locations/{location}/change-active', [LocationController::class, 'changeActive'])->name('locations.change-active');
    });
    Route::resource('locations', LocationController::class);

    // Templates
    Route::group([
        'controller' => TemplateController::class,
        'as' => 'templates.',
        'prefix' => 'templates',
        'middleware' => 'can:update,template',
    ], function () {
        Route::post('{template}/change-active', 'changeActive')->name('change-active');
        Route::post('{template}/duplicate', 'duplicate')->name('duplicate');
    });
    Route::resource('templates', TemplateController::class);

    // Questionnaire templates
    Route::group([
        'as' => 'questionnaires.',
        'prefix' => 'questionnaires',
        'middleware' => 'can:update,App\Models\Questionnaire',
        'controller' => QuestionnaireController::class
    ], function () {
        Route::post('{questionnaire}/mark-as-default', 'markAsDefault')->name('mark-as-default');
        Route::post('{questionnaire}/change-active', 'changeActive')->name('change-active');
        Route::post('{questionnaire}/duplicate', 'duplicate')->name('duplicate');
    });
    Route::apiResource('questionnaires', QuestionnaireController::class, [
        'middleware' => 'can:update,App\Models\Questionnaire',
        'only' => ['index', 'store', 'show', 'update', 'destroy']
    ]);

    // Instructors
    Route::resource('instructors', InstructorController::class);

    // Announcements
    Route::resource('announcements', AnnouncementController::class);

    // Products
    Route::group([
        'as' => 'products.',
        'prefix' => 'products'
    ], function () {
        Route::get('bar-code/{barcode}', [ProductController::class, 'findByBarCode']);
        Route::resource('{product}/variants', VariantController::class)->only([
            'index',
            'store',
        ]);
    });
    Route::resource('products', ProductController::class);

    // Variants
    Route::resource('variants', VariantController::class)->only([
        'update',
        'destroy',
        'show',
        'restore',
    ]);

    // Inventory
    Route::resource('inventories', InventoryController::class)->only([
        'index',
        'update',
    ]);

    // Vendors
    Route::resource('vendors', VendorController::class)->only([
        'index',
        'store',
        'show',
    ]);

    // Categories
    Route::resource('categories', CategoryController::class);

    // Tags
    Route::resource('tags', TagController::class)->only([
        'index',
        'store',
        'show',
    ]);

    // Collections
    Route::post('collections/{collection}/add-products', [CollectionController::class, 'addProducts'])->name('collections.add-products');
    Route::resource('collections', CollectionController::class);

    // Attributes
    Route::resource('attributes', AttributeController::class);

    // Options
    Route::resource('options', OptionController::class)->only([
        'index',
        'show',
        'update',
        'destroy'
    ]);

    // Locations
    Route::resource('shop/locations', ShopLocationController::class, ['as' => 'shop.locations.'])->only([
        'index',
        'store',
        'update',
        'destroy'
    ]);

    // Orders
    Route::group([
        'controller' => ShopOrderController::class,
        'as' => 'orders.',
        'prefix' => 'orders'
    ], function () {
        Route::get('{order}/receipt', 'receipt')->name('receipt');
        Route::get('{order}/pos', 'pos')->name('pos');
        Route::post('{order}/logs', 'logs')->name('logs.create');
        Route::post('{order}/mark-as-paid', 'markAsPaid')->name('mark-as-paid');
        Route::post('{order}/duplicate', 'duplicate')->name('duplicate');
        Route::post('{order}/cancel', 'cancel')->name('cancel');
    });
    Route::resource('orders', ShopOrderController::class);
    Route::resource('customers', CustomerController::class)->only(['show', 'update']);
});

// User Routes
Route::group([
    'as' => 'member.',
    'prefix' => 'member',
    'middleware' => ['auth:sanctum', 'guard:users'],
], function () {
    // Shop
    Route::group([
        'controller' => UserShopController::class,
        'as' => 'shop.',
        'prefix' => 'shop'
    ], function () {
        Route::get('products', 'products')->name('products');
        Route::get('products/{slug}', 'product')->name('products.show');
        Route::resource('orders', OrderController::class);
    });

    // Class Schedules
    Route::post('bookings/{booking}/cancel', [BookingController::class, 'cancel'])->name('bookings.cancel');
    Route::group([
        'as' => 'class-schedules.',
        'prefix' => 'class-schedules',
        'controller' => UserClassScheduleController::class
    ], function () {
        Route::get('', 'index')->name('index');
        Route::post('{class_schedule}', 'book')->name('book');
    });

    // Guest Passes
    Route::resource('guest-passes', GuestPassController::class)->only('index');
    Route::resource('guest-passes', GuestPassController::class)->except('index')->middleware(['subscribed']);

    Route::get('checkin-history', [AuthController::class, 'checkinHistory'])->name('checkin-history');
});

// Public Route
Route::group(['prefix' => 'shared'], function () {
    Route::get('class-schedules', [ClassScheduleController::class, 'shared'])->name('users-class-schedules.shared');
    Route::get('questionnaires/default', [QuestionnaireController::class, 'default'])->name('questionnaires.default');
});

Route::get('qrcode/{user}.png', [UserController::class, 'qrcode'])->name('users.qrcode');

// Gate cloud webhook
Route::post('gate-cloud/webhook', [GateCloudController::class, 'handleWebhook'])->name('gate-cloud.webhook');

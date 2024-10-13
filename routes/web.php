<?php

use Illuminate\Support\Facades\Route;
use Coderstm\Http\Controllers\FileController;
use Coderstm\Http\Controllers\WebPageController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// File Download
Route::get('file/{path}', [FileController::class, 'download'])->name('files.download');

// Keep this at the bottom
Route::group(['controller' => WebPageController::class], function () {
    Route::get('', 'index')->name('home');
    Route::get('/login', 'login')->name('login');
    Route::get('/membership', 'membership')->name('membership');
    Route::get('/blogs', 'blogs')->name('blogs');
    Route::post('/contact', 'contact')->name('contact.submit');
    Route::get('/blogs/{slug}', 'blog')->name('blog');
    Route::get('/pages/{slug}', 'pages')->name('pages');
});

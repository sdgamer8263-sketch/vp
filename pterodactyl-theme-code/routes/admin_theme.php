<?php

use Illuminate\Support\Facades\Route;
use Pterodactyl\Http\Controllers\Admin\ThemeSettingsController;

/*
|--------------------------------------------------------------------------
| Admin Theme Routes
|--------------------------------------------------------------------------
|
| These routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Add this to your routes/admin.php or routes/api-admin.php depending on your setup
Route::group(['prefix' => 'theme-settings', 'middleware' => ['admin']], function () {
    Route::get('/', [ThemeSettingsController::class, 'index'])->name('admin.theme');
    Route::post('/', [ThemeSettingsController::class, 'update'])->name('admin.theme.update');
});

<?php
use App\Http\Controllers\usersController;
use App\Http\Controllers\adminController;
use App\Http\Controllers\ReviewController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;


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
Auth::routes();

Route::resource('admin', adminController::class);

Route::post('/addReview{id}', [ReviewController::class, 'addReview'])
  ->name('review.addReview');

 Route::delete('/deleteReview{productId}{reviewId}', [ReviewController::class , 'deleteReview'])
  ->name('review.deleteReview'); 

Route::delete('/admin{id}', [adminController::class, 'deleteOrder'])
  ->name('admin.deleteOrder');

Route::get('/contact', [usersController::class, 'contact'])
  ->name('users.contact');
  
Route::post('/placeOrder', [usersController::class, 'placeOrder'])
    ->name('users.placeOrder');

Route::post('/increaseQunatity{id}', [usersController::class, 'increaseQunatity'])
  ->name('users.increaseQunatity');

Route::post('/decreaseQuantity{id}', [usersController::class, 'decreaseQuantity'])
  ->name('users.decreaseQuantity');

Route::get('/', [usersController::class, 'index'])
  ->name('users.index');

Route::post('/checkout{total}', [usersController::class, 'checkout'])
  ->name('users.checkout');  

Route::post('/deleteCart{id}', [usersController::class, 'deleteCart'])
  ->name('users.deleteCart');

Route::get('/cart', [usersController::class, 'viewCart'])
  ->name('users.viewCart'); 

Route::get('/{id}', [usersController::class, 'show'])
  ->name('users.show');
  
Route::post('/{id}', [usersController::class, 'addCart'])
  ->name('users.addCart');





  

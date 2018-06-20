<?php

use App\Events\MessagePushed;

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

Route::get('/', 'HomeController@index')->name('home');

Auth::routes();

Route::post('/public_chat/store', 'PublicChatController@store')->name('public-chat-store');

// chat
Route::get('/chats', 'ChatController@index');
Route::get('/chats/{id}', 'ChatController@show');
Route::get('/chats/create/new', 'ChatController@create');
Route::post('/chats', 'ChatController@store');
Route::post('/private_chat/store/{id}', 'ChatController@privateMessage');
//end chat


Route::get('/test', 'TestController@index')->name('test');

Route::get('/testEvent', function(){
	$message = DB::connection('mongodb')->collection('messages')->get();
	return $message;
});

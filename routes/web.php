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

Route::get('/', 'PublicChatController@index')->name('home');
Route::get('/public_chat', 'PublicChatController@index')->name('public-chat');

Auth::routes();

Route::post('/public_chat/store', 'PublicChatController@store')->name('public-chat-store');


Route::get('/test', 'TestController@index')->name('test');

Route::get('/testEvent', function(){
	event(new MessagePushed("derp"));
	return "Derp";
});

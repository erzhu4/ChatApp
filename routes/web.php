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
Route::get('/chats/create', 'ChatController@create')->middleware('auth');
Route::post('/chats', 'ChatController@store')->middleware('auth');
//end chat


Route::get('/test', 'TestController@index')->name('test');

Route::get('/testEvent', function(){
	event(new MessagePushed("derp"));
	return "Derp";
});

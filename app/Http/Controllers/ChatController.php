<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Events\MessagePushed;
use App\Events\ChatCreated;

use App\Chat as Chat;

class ChatController extends Controller
{

    public function index()
    {
        $allChats = Chat::all();
        return $allChats;
    }


    public function create()
    {
        return view('chat/create');
    }


    public function store(Request $request)
    {
        $params = $request->all();
        $params['created_by'] = Auth::id();

        $newChat = new Chat($params);
        $newChat->save();
        event(new ChatCreated($newChat));
        return redirect("/");
    }


    public function show($id)
    {
        $chat = Chat::find($id);
        return view("chat/show", array('chat' => json_encode($chat)));
    }


    public function edit($id)
    {
        //
    }


    public function update(Request $request, $id)
    {
        //
    }


    public function destroy($id)
    {
        //
    }

    public function privateMessage(Request $request, $id){
        $params = [];
        $params['data'] = $request->all();
        $params['channel'] = "chat-".$id;
        event(new MessagePushed($params));
    }
}

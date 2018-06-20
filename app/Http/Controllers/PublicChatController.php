<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\MessagePushed;

class PublicChatController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view("public_chat/public_chat");
    }

    public function store(Request $request)
    {
        $params = [];
        $params["data"] = $request->all();
        $params['channel'] = "public-chat-channel";
        event(new MessagePushed($params));
    }
}

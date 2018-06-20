<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Twilio\Rest\Client;

use App\MongoModels\Message;

class TestController extends Controller
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
        // Your Account SID and Auth Token from twilio.com/console
        // In production, these should be environment variables. E.g.:
        // $auth_token = $_ENV["TWILIO_ACCOUNT_SID"]

        // A Twilio number you own with SMS capabilities
        // $twilio_number = "+19704091390";

        // $client = new Client($account_sid, $auth_token);
        // $client->messages->create(
        //     '+12023048498',
        //     array(
        //         'from' => $twilio_number,
        //         'body' => 'EGGY!!!'
        //     )
        // );


        //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

        // $message = \DB::connection('mongodb')->collection('messages')->get();
        $message = Message::all();
        return $message;
    }
}

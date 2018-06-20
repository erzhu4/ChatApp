<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Twilio\Rest\Client;

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
        // $account_sid = 'AC4f37b45fe0507f9b0e7b2762826a5436';
        // $auth_token = 'a3f197359d6cc964639e838fbeda62c8';
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

        return "tested";
    }
}

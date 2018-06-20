<?php

namespace App\MongoModels;

use Jenssegers\Mongodb\Eloquent\Model;

class Message extends Model
{
	protected $connection = 'mongodb';
	protected $collection = 'messages';
    protected $fillable = ["text", "chat_id"];
}

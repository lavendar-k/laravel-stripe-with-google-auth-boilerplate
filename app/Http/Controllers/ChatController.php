<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use OpenAI;

class ChatController extends Controller
{
    private $client;

    public function __construct()
    {
        $this->client = OpenAI::client(config('services.openai.key'));
    }

    public function sendMessage(Request $request)
    {
        $message = $request->input('message');

        $stream = $this->client->chat()->create([
            'model' => 'gpt-4',
            'messages' => [
                ['role' => 'user', 'content' => $message],
            ],
        ]);

        $aiResponse = $stream['choices'][0]['message']['content'] ?? 'Sorry, I couldn\'t respond to that.';

        return response()->json(['response' => $aiResponse]);
    }
}

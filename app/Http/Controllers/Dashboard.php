<?php

namespace App\Http\Controllers;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;


class Dashboard extends Controller
{
    public function api_get(Request $request, $path)
    {
        $r = $request->request;
        switch ($path) {
            case "init":
                return $this->initSession();
            default:
                return $this->fail("Route not found");
        }
    }


    //

    private function response($success = true, $payload) {
        return response()->json([
            'success' => $success,
            'payload' => $payload
        ]);
    }

    private function fail($message) {
        return $this->response(false, [
            "message" => $message
        ]);
    }
    
    private function success($message) {
        return $this->response(true, [
            "message" => $message
        ]);
    }

    //

    private function initSession() {
        if (Auth::check()) {
            $user = Auth::user();
            return $this->response(true, [
                "baseUrl" => "",
                "user" => [
                    "name" => $user->name,
                    "picture" => $user->picture
                ]
            ]);
        }

        return $this->fail("Need to be logged in.");
    }

}
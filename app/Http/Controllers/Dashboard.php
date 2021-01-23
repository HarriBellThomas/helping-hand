<?php

namespace App\Http\Controllers;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;


class Dashboard extends Controller
{
    public function api_get(Request $request, $path) {
        $r = $request->request;
        switch ($path) {
            case "init":
                return $this->initSession();
            default:
                return $this->fail("Route not found");
        }
    }

    public function api_post(Request $request, $path) {
        $r = $request->request;
        switch ($path) {
            case "get-jobs":
                return $this->findLocalJobs($request);
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

    private function hasParameters($r, $params) {
        if ($r) {
            foreach ($params as $param) {
                $val = $r->get($param);
                if (!$r->has($param)) return false;
            }
        }
        return true;
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

    private function findLocalJobs($request) {
        $required = ["lat", "long", "radius"];
        if (Auth::check() && $this->hasParameters($request, $required)) {
            return $this->response(true, [
                "jobs" => array(
                    ["id" => "_1", "lat" => 0.0, "long" => 0.0, "name" => "Task 1", "description" => "This is something...", "author" => "Harri"],
                    ["id" => "_2", "lat" => 0.01, "long" => 0.01, "name" => "Task 2", "description" => "This is something...", "author" => "Harri"],
                    ["id" => "_3", "lat" => 0.02, "long" => 0.02, "name" => "Task 3", "description" => "This is something...", "author" => "Harri"],
                )
            ]);
        }

        return $this->fail("Need to be logged in.");
    }

}
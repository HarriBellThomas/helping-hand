<?php

namespace App\Http\Controllers;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Job;

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
                    [
                        "id" => "_1",
                        "lat" => 52.2087, 
                        "long" => 0.1149,
                        "summary" => "Mow my lawn, bitches",                        
                        "description" => "This is something...",
                        "owner_name" => "Harri",
                        "owner_id" => "harri",
                        "created" => 1611436310,
                        "completion_target_1" => 1611436320,
                        "completion_target_2" => 1611436330,
                        "status" => "pending",
                        "severity" => "MEDIUM"
                    ],
                    [
                        "id" => "_2",
                        "lat" => 52.209120, 
                        "long" => 0.123199,
                        "summary" => "Mow my lawn, bitches: the sequel",                        
                        "description" => "This is something...",
                        "owner_name" => "Harri",
                        "owner_id" => "harri",
                        "created" => 1611436315,
                        "completion_target_1" => 1611436325,
                        "completion_target_2" => 1611436335,
                        "status" => "pending",
                        "severity" => "URGENT"
                    ],
                )
            ]);
        }

        return $this->fail("Invalid request.");
    }

    private function submitJob($request) {
        $required = [
            "lat",
            "long",
            "summary",
            "description",
            "completion_target_1",
            "completion_target_2",
        ];
        if (Auth::check() && $this->hasParameters($request, $required)) {
            $job = new Job();

            // From request body.
            $job->setAttribute("lat", $request->get("lat"));
            $job->setAttribute("long", $request->get("long"));
            $job->setAttribute("summary", $request->get("lat"));
            $job->setAttribute("description", $request->get("description"));
            $job->setAttribute("completion_target_1", $request->get("completion_target_1"));
            $job->setAttribute("completion_target_2", $request->get("completion_target_2"));

            // Infer job metadata.
            $job->setAttribute("owner_id", Auth::user()->sub);
            $job->setAttribute("created", time());
            $job->setAttribute("status", "pending");

            // Save job.
            if ($job->save()) {
                return $this->response(true, ["job" => $job]);
            } else {
                return $this->fail("Failed to save job.");
            }
        }

        return $this->fail("Invalid request.");
    }

}
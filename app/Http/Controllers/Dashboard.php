<?php

namespace App\Http\Controllers;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Job;
use App\User;

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

    public function api_post(Request $request, $path)
    {
        $r = $request->request;
        switch ($path) {
            case "get-jobs":
                return $this->findLocalJobs($request);
            case "create-job":
                return $this->submitJob($request);
            case "update-job":
                return $this->updateJob($request);
            case "update-postcode":
                return $this->updatePostcode($request);
            default:
                return $this->fail("Route not found");
        }
    }

    //

    private function response($success = true, $payload)
    {
        return response()->json([
            'success' => $success,
            'payload' => $payload
        ]);
    }

    private function fail($message)
    {
        return $this->response(false, [
            "message" => $message
        ]);
    }

    private function success($message)
    {
        return $this->response(true, [
            "message" => $message
        ]);
    }

    private function hasParameters($r, $params)
    {
        if ($r) {
            foreach ($params as $param) {
                $val = $r->get($param);
                if (!$r->has($param)) return false;
            }
        }
        return true;
    }

    //

    private function initSession()
    {
        if (Auth::check()) {
            $user = Auth::user();
            return $this->response(true, [
                "baseUrl" => "",
                "user" => [
                    "name" => $user->name,
                    "picture" => $user->picture,
                    "email" => $user->email,
                ]
            ]);
        }

        return $this->fail("Need to be logged in.");
    }

    private function findLocalJobs($request)
    {
        $required = ["lat", "long", "radius"];
        if (Auth::check() && $this->hasParameters($request, $required)) {
            $lat = $request->get("lat");
            $long = $request->get("long");
            $radius = $request->get("radius");

            // Geofilter.
            $jobs = Job::selectRaw("*, (6371 * acos(cos(radians({$lat}))
                                    * cos(radians(`latitude`))
                                    * cos(radians(`longitude`) - radians({$long}))
                                    + sin(radians({$lat}))
                                    * sin(radians(`latitude`)))) AS distance ")
                ->havingRaw('distance < ?', [$radius])
                ->get();
            return $this->response(true, ["jobs" => $jobs]);
        }

        return $this->fail("Invalid request.");
    }

    private function submitJob($request)
    {
        $required = [
            "latitude",
            "longitude",
            "summary",
            "description",
            "completion_target_1",
            "completion_target_2",
            "severity",
        ];
        if (Auth::check() && $this->hasParameters($request, $required)) {
            $job = new Job();

            // From request body.
            $job->setAttribute("latitude", $request->get("latitude"));
            $job->setAttribute("longitude", $request->get("longitude"));
            $job->setAttribute("summary", $request->get("summary"));
            $job->setAttribute("description", $request->get("description"));
            $job->setAttribute("completion_target_1", $request->get("completion_target_1"));
            $job->setAttribute("completion_target_2", $request->get("completion_target_2"));
            $job->setAttribute("severity", $request->get("severity"));

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

    private function updateJob($request)
    {
        $required = [
            "id",
        ];
        if (Auth::check() && $this->hasParameters($request, $required)) {
            $job = Job::where('id', $request->id)->first();

            // extract relevant key-vals
            $newJobData = array_intersect_key(
                array($request),
                array_flip(
                      array(
                          "latitude",
                          "longitude",
                          "summary",
                          "description",
                          "completion_target_1",
                          "completion_target_2",
                          "severity",
                          "status")
                    ));

            // place updates into job
            $job->fill($newJobData);

            // Save job.
            if ($job->save()) {
                return $this->response(true, ["job" => $job]);
            } else {
                return $this->fail("Failed to save job.");
            }
        }

        return $this->fail("Invalid request.");
    }

    private function updatePostcode($request)
    {
        $required = [
            "id",
            "postcode",
        ];
        if (Auth::check() && $this->hasParameters($request, $required)) {
            $user = User::where("id", $request->id)->first();

            $user->setAttribute("current_postcode", $request->get("postcode"));

            // Save user.
            if ($user->save()) {
                return $this->response(true, ["user" => $user]);
            } else {
                return $this->fail("Failed to save user.");
            }
        }

        return $this->fail("Invalid request.");
    }
}

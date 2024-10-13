<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyGateCloudToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Get the G-Token header from the request
        $gToken = $request->header('G-Token');
        $gatecloud = app_settings('gatecloud');

        // Get the G-Token value from the config file
        $expectedToken = $gatecloud->get('wehbook_token');

        // Check if the header matches the expected value
        if ($gToken !== $expectedToken) {
            // If not, return a response or perform the desired action
            return response()->json(['error' => 'Invalid access token provided.'], 401);
        }

        return $next($request);
    }
}

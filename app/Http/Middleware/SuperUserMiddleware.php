<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SuperUserMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if(Auth::check()) {
            if(auth()->user()->tokenCan('server:adminUser')) {
                return $next($request);
            }
            else if(auth()->user()->tokenCan('server:superUser')) {
                return $next($request);
            }
            else {
                return response()->json([
                    'message' => 'Access denied.! As you are not a SuperUser',
                ], 403);
            }
        }
        else {
            return response()->json ([
                'status' => 401,
                'message' => 'Please login first.'
            ]);
        }
    }
}

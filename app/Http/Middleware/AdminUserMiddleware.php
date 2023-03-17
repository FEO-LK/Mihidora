<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminUserMiddleware
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
            else {
                return response()->json([
                    'message' => 'Access denied.! As you are not an AdminUser',
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

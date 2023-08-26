<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Validator;

class AnalyticsController extends Controller
{
    // basic user counts
    public function getUserCounts()
    {
        // total user count
        $totalUsers = User::count();

        // registrations for current month
        $year = date('Y');
        $month = date('m');
        $totalUsersCurrentMonth = User::whereYear('created_at', $year)
            ->whereMonth('created_at', $month)
            ->count();

        // registration for current week
        $startOfWeek = Carbon::now()->startOfWeek(); // Get the start of the current week
        $endOfWeek = Carbon::now()->endOfWeek(); // Get the end of the current week
        $usersInCurrentWeek = User::whereBetween('created_at', [
            $startOfWeek,
            $endOfWeek,
        ])->count();

        return response()->json([
            'status' => 200,
            'total' => $totalUsers,
            'month' => $totalUsersCurrentMonth,
            'week' => $usersInCurrentWeek,
        ]);
    }

    // User counts by past dasy (past 7, 30, 90)
    public function getUserCountByDays(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'days' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }

        $endDate = Carbon::now();
        $startDate = Carbon::now()->subDays($request->days);
        $dateRange = [];
        $userCounts = [];

        $currentDate = $startDate->copy();

        while ($currentDate <= $endDate) {
            $dateRange[] = $currentDate->format('Y-m-d');

            $userCount = User::whereDate('created_at', $currentDate)->count();
            $userCounts[$currentDate->format('Y-m-d')] = $userCount;

            $currentDate->addDay();
        }
        return response()->json([
            'status' => 200,
            'count' => $userCounts,
        ]);
    }

    // Get user counts by months
    public function getUserCountByMonths(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'months' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }
        $endDate = Carbon::now();
        $startDate = Carbon::now()->subMonths($request->months); // 5 months ago
        $monthCounts = [];

        $currentMonth = $startDate->copy();
        $currentMonth->day = 1; // Set day to 1 to ensure the entire month is covered

        while ($currentMonth <= $endDate) {
            $startOfMonth = $currentMonth->copy()->startOfMonth();
            $endOfMonth = $currentMonth->copy()->endOfMonth();

            $userCount = User::whereBetween('created_at', [
                $startOfMonth,
                $endOfMonth,
            ])->count();

            $monthCounts[$currentMonth->format('Y-m')] = $userCount;

            $currentMonth->addMonth();
        }
        return response()->json([
            'status' => 200,
            'count' => $monthCounts,
        ]);
    }

    // Return the user count between two dates, by week
    public function getUserCountByDateRange(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'start' => 'required',
            'end' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }

        $start = $request->start;
        $end = $request->end;

        $startDate = Carbon::create(
            $start['year'],
            $start['month'],
            $start['date']
        );
        $endDate = Carbon::create($end['year'], $end['month'], $end['date']);

        $weekCounts = [];

        $currentWeek = $startDate->copy()->startOfWeek();

        while ($currentWeek <= $endDate) {
            $startOfWeek = $currentWeek->copy();
            $endOfWeek = $currentWeek->copy()->endOfWeek();

            $userCount = User::whereBetween('created_at', [
                $startOfWeek,
                $endOfWeek,
            ])->count();

            $weekCounts[$startOfWeek->format('Y-m-d')] = $userCount;

            $currentWeek->addWeek();
        }

        return response()->json([
            'status' => 200,
            'total' => $weekCounts,
        ]);
    }

    // reutrns the use count by month for a given date range
    public function getUserCountBreakdownByMonth(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'start' => 'required',
            'end' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }

        $start = $request->start;
        $end = $request->end;

        $startDate = Carbon::create(
            $start['year'],
            $start['month'],
            $start['date']
        );
        $endDate = Carbon::create($end['year'], $end['month'], $end['date']);

        $monthCounts = [];

        $currentMonth = $startDate->copy()->startOfMonth();

        while ($currentMonth <= $endDate) {
            $startOfMonth = $currentMonth->copy();
            $endOfMonth = $currentMonth->copy()->endOfMonth();

            $userCount = User::whereBetween('created_at', [
                $startOfMonth,
                $endOfMonth,
            ])->count();

            $monthCounts[$startOfMonth->format('Y-m')] = $userCount;

            $currentMonth->addMonth();
        }

        return response()->json([
            'status' => 200,
            'total' => $monthCounts,
        ]);
    }

    // return user count breakdown by year for a given date range
    public function getUserCountByYear(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'start' => 'required',
            'end' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }

        $start = $request->start;
        $end = $request->end;

        $startDate = Carbon::create(
            $start['year'],
            $start['month'],
            $start['date']
        );
        $endDate = Carbon::create($end['year'], $end['month'], $end['date']);

        $yearCounts = [];

        $currentYear = $startDate->copy()->startOfYear();

        while ($currentYear <= $endDate) {
            $startOfYear = $currentYear->copy();
            $endOfYear = $currentYear->copy()->endOfYear();

            $userCount = User::whereBetween('created_at', [
                $startOfYear,
                $endOfYear,
            ])->count();

            $yearCounts[$startOfYear->year] = $userCount;

            $currentYear->addYear();
        }

        return response()->json([
            'status' => 200,
            'total' => $yearCounts,
        ]);
    }

    public function getWeekStartEndByDate($year, $month, $date)
    {
        $givenDate = Carbon::create($year, $month, $date); // Replace with your given date

        $weekStart = $givenDate->copy()->startOfWeek();
        $weekEnd = $givenDate->copy()->endOfWeek();
        return [
            'start' => $givenDate->copy()->startOfWeek(),
            'end' => $givenDate->copy()->endOfWeek(),
        ];
    }
}

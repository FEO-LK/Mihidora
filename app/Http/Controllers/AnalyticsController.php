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

    /**
     * Returns the number of registrations for a given number of days
     * Breakdown by Months
     * User counts by past dasy (past 7, 30)
     */
    public function getUserCountByDays(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'days' => 'required|integer|min:1',
        ]);
        if ($validator->fails()) {
            return response()->json(
                [
                    'validation_errors' => $validator->messages(),
                ],
                400
            ); // Return a 400 Bad Request status
        }

        $endDate = Carbon::now();
        $startDate = Carbon::now()->subDays($request->days);
        $dateRange = [];
        $userCounts = [];

        $currentDate = $startDate->copy();

        while ($currentDate <= $endDate) {
            $dateRange[] = $currentDate->format('Y-m-d');

            // Use whereBetween to optimize querying for each day
            $nextDate = $currentDate->copy()->addDay();
            $userCount = User::whereBetween('created_at', [
                $currentDate,
                $nextDate,
            ])->count();
            $userCounts[] = $userCount;
            $currentDate->addDay();
        }
        return response()->json([
            'status' => 200,
            'count' => $userCounts,
            'dates' => $dateRange,
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
    /**
     * Returns the number of registrations for a given number of days
     * Breakdown by Weeks
     */
    public function getUserCountsByWeeks(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'days' => 'required|integer|min:1', // Ensure days is a positive integer
        ]);

        if ($validator->fails()) {
            return response()->json(
                [
                    'validation_errors' => $validator->messages(),
                ],
                400
            );
        }

        $endDate = Carbon::now();
        $startDate = Carbon::now()->subDays($request->days);
        $dateRange = [];
        $userCounts = [];

        $currentDate = $startDate->copy();

        while ($currentDate <= $endDate) {
            $weekStart = $currentDate->copy()->startOfWeek();
            $weekEnd = $currentDate->copy()->endOfWeek();
            $dateRange[] =
                $weekStart->format('M d') . ' - ' . $weekEnd->format('M d');

            $nextWeekStart = $weekStart->copy()->addWeek();
            $userCount = User::whereBetween('created_at', [
                $weekStart,
                $nextWeekStart,
            ])->count();
            $userCounts[] = $userCount;

            $currentDate->addWeek();
        }

        return response()->json([
            'status' => 200,
            'count' => $userCounts,
            'dates' => $dateRange,
        ]);
    }

    /**
     * Returns the number of registrations for a given number of days
     * Breakdown by Months
     */
    public function getUserCountsByMonthsforNumberofDays(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'days' => 'required|integer|min:1', // Ensure days is a positive integer
        ]);

        if ($validator->fails()) {
            return response()->json(
                [
                    'validation_errors' => $validator->messages(),
                ],
                400
            );
        }

        $endDate = Carbon::now();
        $startDate = Carbon::now()->subDays($request->days);
        $dateRange = [];
        $userCounts = [];

        $currentDate = $startDate->copy();

        while ($currentDate <= $endDate) {
            $monthStart = $currentDate->copy()->startOfMonth();
            $monthEnd = $currentDate->copy()->endOfMonth();
            $dateRange[] = $monthStart->format('M Y');

            $nextMonthStart = $monthStart->copy()->addMonth();
            $userCount = User::whereBetween('created_at', [
                $monthStart,
                $nextMonthStart,
            ])->count();
            $userCounts[] = $userCount;

            $currentDate->addMonth();
        }

        return response()->json([
            'status' => 200,
            'count' => $userCounts,
            'dates' => $dateRange,
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
        $dateRange = [];
        $weekCounts = [];

        $currentWeek = $startDate->copy()->startOfWeek();

        while ($currentWeek <= $endDate) {
            $object = [];
            $startOfWeek = $currentWeek->copy();
            $endOfWeek = $currentWeek->copy()->endOfWeek();

            $userCount = User::whereBetween('created_at', [
                $startOfWeek,
                $endOfWeek,
            ])->count();
            $object = [
                'date' => $startOfWeek->format('Y-m-d'),
                'count' => $userCount,
            ];
            $weekCounts[] = $object;
            $dateRange[] = $startOfWeek->format('Y-m-d');

            $currentWeek->addWeek();
        }

        return response()->json([
            'status' => 200,
            'results' => $weekCounts,
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
            $object = [];
            $userCount = User::whereBetween('created_at', [
                $startOfMonth,
                $endOfMonth,
            ])->count();
            $object = [
                'date' => $startOfMonth->format('Y-m'),
                'count' => $userCount,
            ];
            $monthCounts[] = $object;

            $currentMonth->addMonth();
        }

        return response()->json([
            'status' => 200,
            'results' => $monthCounts,
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
            $object = [];
            $userCount = User::whereBetween('created_at', [
                $startOfYear,
                $endOfYear,
            ])->count();

            $object = [
                'date' => $startOfYear->year,
                'count' => $userCount
            ];
            $yearCounts[] = $object;
            $currentYear->addYear();
        }
        return response()->json([
            'status' => 200,
            'results' => $yearCounts,
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

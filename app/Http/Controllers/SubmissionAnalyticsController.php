<?php

namespace App\Http\Controllers;

use App\Models\Projects;
use App\Models\DataEducation;
use App\Models\WhatsOn;
use App\Models\Classifieds;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Validator;

class SubmissionAnalyticsController extends Controller
{
    // Generic submission counts
    public function getSubmissionCounts()
    {
        $projectCount = Projects::count();
        $dataCount = DataEducation::where('type', 1)->count();
        $eLearningCount = DataEducation::where('type', 2)->count();
        $resources = Classifieds::count();
        $events = WhatsOn::count();

        return response()->json([
            'status' => 200,
            'projects' => $projectCount,
            'data' => $dataCount,
            'elearning' => $eLearningCount,
            'resources' => $resources,
            'events' => $events,
        ]);
    }

    public function submissionsByOrganisations(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'organization_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }
        $org_id = $request->organization_id;

        $projectCount = Projects::where('organization_id', $org_id)->count();
        $dataCount = DataEducation::where([
            ['organization_id', '=', $org_id],
            ['type', '=', 1],
        ])->count();
        $eLearningCount = DataEducation::where([
            ['organization_id', '=', $org_id],
            ['type', '=', 2],
        ])->count();
        $resources = Classifieds::where('organization_id', $org_id)->count();
        $events = WhatsOn::where('organization_id', $org_id)->count();

        return response()->json([
            'status' => 200,
            'projects' => $projectCount,
            'data' => $dataCount,
            'e-learning' => $eLearningCount,
            'resources' => $resources,
            'events' => $events,
        ]);
    }

    // get submissions by week for a given date range
    public function submissionsByOrganisationsByWeek(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'start' => 'required',
            'end' => 'required',
            'organization_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }
        $org_id = $request->organization_id;
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

            $projectCount = Projects::whereBetween('created_at', [
                $startOfWeek,
                $endOfWeek,
            ])
                ->where('organization_id', $org_id)
                ->count();

            $dataCount = DataEducation::whereBetween('created_at', [
                $startOfWeek,
                $endOfWeek,
            ])
                ->where([['organization_id', '=', $org_id], ['type', '=', 1]])
                ->count();

            $eLearningCount = DataEducation::whereBetween('created_at', [
                $startOfWeek,
                $endOfWeek,
            ])
                ->where([['organization_id', '=', $org_id], ['type', '=', 2]])
                ->count();

            $resources = Classifieds::whereBetween('created_at', [
                $startOfWeek,
                $endOfWeek,
            ])
                ->where('organization_id', $org_id)
                ->count();

            $events = Classifieds::whereBetween('created_at', [
                $startOfWeek,
                $endOfWeek,
            ])
                ->where('organization_id', $org_id)
                ->count();
            $object = [
                'projects' => $projectCount,
                'data' => $dataCount,
                'elearning' => $eLearningCount,
                'resources' => $resources,
                'events' => $events,
                'week' => $startOfWeek->format('Y-m-d')
            ];
            $weekCounts[] = $object;
            $currentWeek->addWeek();
        }

        return response()->json([
            'status' => 200,
            'total' => $weekCounts,
        ]);
    }

    // Get submissions by month for a given date range
    public function submissionsByOrganisationsByMonth(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'start' => 'required',
            'end' => 'required',
            'organization_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }
        $org_id = $request->organization_id;
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

            $projectCount = Projects::whereBetween('created_at', [
                $startOfMonth,
                $endOfMonth,
            ])
                ->where('organization_id', $org_id)
                ->count();

            $dataCount = DataEducation::whereBetween('created_at', [
                $startOfMonth,
                $endOfMonth,
            ])
                ->where([['organization_id', '=', $org_id], ['type', '=', 1]])
                ->count();

            $eLearningCount = DataEducation::whereBetween('created_at', [
                $startOfMonth,
                $endOfMonth,
            ])
                ->where([['organization_id', '=', $org_id], ['type', '=', 2]])
                ->count();

            $resources = Classifieds::whereBetween('created_at', [
                $startOfMonth,
                $endOfMonth,
            ])
                ->where('organization_id', $org_id)
                ->count();

            $events = Classifieds::whereBetween('created_at', [
                $startOfMonth,
                $endOfMonth,
            ])
                ->where('organization_id', $org_id)
                ->count();

            $monthCounts[$startOfMonth->format('Y-m')] = [
                'projects' => $projectCount,
                'data' => $dataCount,
                'e-learning' => $eLearningCount,
                'resources' => $resources,
                'events' => $events,
            ];

            $currentMonth->addMonth();
        }

        return response()->json([
            'status' => 200,
            'total' => $monthCounts,
        ]);
    }

    // Get submissions by year for a given date range
    public function submissionsByOrganisationsByYear(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'start' => 'required',
            'end' => 'required',
            'organization_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }
        $org_id = $request->organization_id;
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

            $projectCount = Projects::whereBetween('created_at', [
                $startOfYear,
                $endOfYear,
            ])
                ->where('organization_id', $org_id)
                ->count();

            $dataCount = DataEducation::whereBetween('created_at', [
                $startOfYear,
                $endOfYear,
            ])
                ->where([['organization_id', '=', $org_id], ['type', '=', 1]])
                ->count();

            $eLearningCount = DataEducation::whereBetween('created_at', [
                $startOfYear,
                $endOfYear,
            ])
                ->where([['organization_id', '=', $org_id], ['type', '=', 2]])
                ->count();

            $resources = Classifieds::whereBetween('created_at', [
                $startOfYear,
                $endOfYear,
            ])
                ->where('organization_id', $org_id)
                ->count();

            $events = Classifieds::whereBetween('created_at', [
                $startOfYear,
                $endOfYear,
            ])
                ->where('organization_id', $org_id)
                ->count();

            $yearCounts[$startOfYear->year] = [
                'projects' => $projectCount,
                'data' => $dataCount,
                'e-learning' => $eLearningCount,
                'resources' => $resources,
                'events' => $events,
            ];

            $currentYear->addYear();
        }

        return response()->json([
            'status' => 200,
            'total' => $yearCounts,
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Coderstm\Services\SubscriptionReports;
use Illuminate\Http\Resources\Json\ResourceCollection;

class UserReportsController extends Controller
{
    public function index(Request $request)
    {
        $reports = new SubscriptionReports($request);

        switch ($request->type) {
            case 'rolling':
                $reports = $reports->onlyRolling();
                break;
            case 'end_date':
                $reports = $reports->onlyEnds();
                break;
            case 'cancelled':
                $reports = $reports->onlyCancelled();
                break;
            case 'free':
                $reports = $reports->onlyFree();
                break;
            default:
                $reports = $reports->query();
                break;
        }

        $reports = $reports->orderBy($request->sortBy ?? 'created_at', $request->direction ?? 'desc')
            ->paginate($request->rowsPerPage ?? 15);

        return new ResourceCollection($reports);
    }

    public function reports(Request $request)
    {
        $reports = new SubscriptionReports($request);

        $rolling = $reports->onlyRolling();
        $end_date = $reports->onlyEnds();
        $cancelled = $reports->onlyCancelled();

        return response()->json([
            'total' => $reports->count(),
            'total_paid' => $reports->sumOfPayments(),
            'rolling' => $rolling->count(),
            'rolling_total' => $reports->sumOfRolling(),
            'end_date' => $end_date->count(),
            'end_date_total' => $reports->sumOfEnds(),
            'free' => $reports->onlyFree()->count(),
            'cancelled' => $cancelled->count(),
            'cancelled_total' => $reports->sumOfCancelled(),
        ], 200);
    }

    public function reportsMonthly(Request $request)
    {
        return $this->reports($request);
    }

    public function reportsYearly(Request $request)
    {
        return $this->reports($request);
    }

    public function reportsDaily(Request $request)
    {
        return $this->reports($request);
    }

    public function pdf(Request $request)
    {
        return Pdf::loadView('pdfs.reports', $request->only(['rows', 'columns']))->download("reports-{$request->type}.pdf");
    }
}

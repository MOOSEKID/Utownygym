<?php

namespace App\Http\Controllers;

use Coderstm\Coderstm;
use App\Models\Booking;
use Coderstm\Models\Log;
use Illuminate\Http\Request;
use App\Models\ClassSchedule;
use Illuminate\Support\Carbon;
use Coderstm\Models\Shop\Order;
use Illuminate\Support\Facades\DB;

class ChartsController extends Controller
{
    private function graphMonths($months = 11, $format = 'M y')
    {
        $baseDate = Carbon::now();
        $start = $baseDate->copy()->subMonths($months)->startOfMonth();
        $end = $baseDate->endOfMonth();

        $months = [];
        $diffInMonths = $start->diffInMonths($end);

        for ($i = 0; $i <= $diffInMonths; $i++) {
            $currentDate = $start->copy()->addMonths($i);
            $months[] = $currentDate->format($format);
        }

        return $months;
    }

    private function graphDays($days = 6, $format = 'D, d')
    {
        $baseDate = Carbon::now();
        $start = $baseDate->copy()->subDays($days)->startOfDay();
        $end = $baseDate->endOfDay();

        $days = [];
        $diffInDays = $start->diffInDays($end);

        for ($i = 0; $i <= $diffInDays; $i++) {
            $currentDate = $start->copy()->addDays($i);
            $days[] = $currentDate->format($format);
        }

        return $days;
    }

    private function months($months = 11)
    {
        $start = Carbon::now()->subMonths($months)->startOfMonth();
        $monthsList = [];

        for ($i = 0; $i <= $months; $i++) {
            $monthsList[] = $start->copy()->addMonths($i);
        }

        return $monthsList;
    }

    public function membersBreakdown()
    {
        // Query to count active and inactive members
        $membersData = Coderstm::$userModel::select(
            DB::raw('CASE WHEN status = "Active" THEN "Active" ELSE "Inactive" END as status_label'),
            DB::raw('COUNT(*) as total')
        )
            ->groupBy('status_label')
            ->get()
            ->mapWithKeys(function ($item) {
                return [$item->status_label => $item->total];
            });

        return response()->json($membersData);
    }

    public function userGrowth(Request $request)
    {
        // Get the start and end dates (for example, last 12 months)
        $startDate = Carbon::now()->subMonths(12)->startOfMonth();
        $endDate = Carbon::now()->endOfMonth();

        // Get the data grouped by month
        $growthData = Coderstm::$userModel::select(
            DB::raw('DATE_FORMAT(created_at, "%b %y") as legend'), // MMM YY format
            DB::raw('COUNT(*) as total') // Aggregating the data
        )
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('legend') // Group by legend only
            ->orderBy('legend', 'ASC')
            ->get()->mapWithKeys(function ($item) {
                return [$item->legend => $item->total];
            });

        // Format data for the chart
        $formattedData = [];
        $months = $this->graphMonths();

        foreach ($months as $month) {
            $formattedData[$month] = $growthData[$month] ?? 0;
        }

        return response()->json($formattedData, 200);
    }

    public function revenueBreakdown(Request $request)
    {
        // Group by 'source' and calculate the total number of orders per source
        $orderData = Order::select(
            DB::raw('COALESCE(source, "Online") as source'), // Replace null with "Online"
            // DB::raw('COUNT(*) as total_orders'),            // Count the number of orders per source
            DB::raw('SUM(grand_total) as total_revenue')    // Sum the grand_total for each source
        )
            ->groupBy('source')  // Group by the 'source' column
            ->get()->mapWithKeys(function ($item) {
                return [$item->source => round($item->total_revenue, 2)];
            });

        return response()->json($orderData, 200);
    }

    public function retentionRate(Request $request)
    {
        $months = $this->months();
        $retentionRates = [];

        foreach ($months as $month) {
            $previousMonth = $month->copy()->subMonth()->startOfMonth();

            // Fetch IDs of users created before previous month
            $previousUsers = Coderstm::$userModel::where('created_at', '<', $previousMonth)
                ->pluck('id');

            $totalPreviousUsers = $previousUsers->count();

            // Count active users from that list
            $retainedUsers = Coderstm::$userModel::whereIn('id', $previousUsers)
                ->where('status', 'active')
                ->count();

            // Calculate retention rate
            $retentionRates[$month->format('M y')] = $totalPreviousUsers > 0 ? round(($retainedUsers / $totalPreviousUsers) * 100, 2) : 0;
        }

        return response()->json($retentionRates, 200);
    }

    public function attendanceUtilization(Request $request)
    {
        // Get the start and end dates for the last 12 months
        $startDate = Carbon::now()->subMonths(12)->startOfMonth();
        $endDate = Carbon::now()->endOfMonth();

        // Get data grouped by month for attendance and utilization
        $attendanceData = Booking::select(
            DB::raw('DATE_FORMAT(schedules_at, "%b %y") as legend'), // MMM YY format
            DB::raw('COUNT(CASE WHEN attendance = 1 THEN 1 END) as attended'), // Count attended bookings
            DB::raw('COUNT(*) as totalBookings') // Total bookings including standbys/cancellations
        )
            ->whereBetween('schedules_at', [$startDate, $endDate])
            ->groupBy('legend')
            ->orderBy('legend', 'ASC')
            ->get()
            ->mapWithKeys(function ($item) {
                return [$item->legend => [
                    'attended' => $item->attended,
                    'totalBookings' => $item->totalBookings
                ]];
            });

        $expectedCapacity = ClassSchedule::whereBetween('date_at', [$startDate, $endDate])
            ->sum('capacity'); // Assume max capacity for all classes

        // Prepare data for chart (attendance percentage and utilization)
        $attendanceRates = [];
        $utilizationRates = [];
        $months = $this->graphMonths();

        foreach ($months as $month) {
            if (isset($attendanceData[$month])) {
                $attended = $attendanceData[$month]['attended'];
                $totalBookings = $attendanceData[$month]['totalBookings'];

                // Calculate attendance rate as a percentage
                $attendanceRate = $totalBookings > 0 ? ($attended / $totalBookings) * 100 : 0;

                $attendanceRates[$month] = round($attendanceRate, 2);
                $utilizationRates[$month] = round(($totalBookings / $expectedCapacity) * 100, 2);
            } else {
                $attendanceRates[$month] = 0;
                $utilizationRates[$month] = 0;
            }
        }

        return response()->json([
            'attendanceRate' => $attendanceRates,
            'utilizationRate' => $utilizationRates,
        ], 200);
    }

    public function revenueTrends(Request $request)
    {
        $startDate = Carbon::now()->subMonths(12)->startOfMonth();  // Last 12 months
        $endDate = Carbon::now()->endOfMonth();

        // Query for revenue trends
        $revenueTrends = Order::select(
            DB::raw('DATE_FORMAT(created_at, "%b %y") as month'),  // Format date as MMM YY
            DB::raw('SUM(grand_total) as total_revenue')          // Sum grand_total for revenue
        )
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('month')        // Group by month
            ->orderBy('month', 'ASC') // Order by ascending month
            ->get()
            ->mapWithKeys(function ($item) {
                return [$item->month => $item->total_revenue];
            });

        $months = $this->graphMonths(); // Assuming this generates a list of months (MMM YY)
        $formattedData = [];

        foreach ($months as $month) {
            $formattedData[$month] = round($revenueTrends[$month] ?? 0, 0);
        }

        return response()->json($formattedData, 200);
    }

    public function revenueTrendsBySource(Request $request)
    {
        $startDate = Carbon::now()->subMonths(12)->startOfMonth();  // Last 12 months
        $endDate = Carbon::now()->endOfMonth();

        // Query to get total and average revenue grouped by source and month
        $sourceRevenue = Order::select(
            DB::raw('DATE_FORMAT(created_at, "%b %y") as month'),  // Format date as MMM YY
            DB::raw('COALESCE(source, "Online") as source'), // Replace null with "Online"
            DB::raw('SUM(grand_total) as total_revenue'),          // Sum grand_total for total revenue
            DB::raw('AVG(grand_total) as average_revenue')         // Average grand_total for average revenue
        )
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('source', 'month')        // Group by source and month
            ->orderBy('month', 'ASC')           // Order by ascending month
            ->get();

        // Query to get total and average revenue grouped by month
        $revenueData = Order::select(
            DB::raw('DATE_FORMAT(created_at, "%b %y") as month'),  // Format date as MMM YY
            DB::raw('SUM(grand_total) as total_revenue'),          // Sum grand_total for total revenue
            DB::raw('AVG(grand_total) as average_revenue')         // Average grand_total for average revenue
        )
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('month')                  // Group by month
            ->orderBy('month', 'ASC')           // Order by ascending month
            ->get()->mapWithKeys(function ($item) {
                return [$item->month => ['total' => $item->total_revenue, 'average' => $item->average_revenue]];
            });

        // Organize the data by source
        $sources = $sourceRevenue->groupBy('source');

        // Prepare series data for each source
        $formattedData = [];
        $months = $this->graphMonths(); // Assuming this generates a list of months (MMM YY)

        foreach ($sources as $source => $data) {
            $seriesData = [];
            $data = $data->mapWithKeys(function ($item) {
                return [$item->month => $item->total_revenue];
            });

            // Fill in months without data for total and average
            foreach ($months as $month) {
                $seriesData[] = round($data[$month] ?? 0, 2);
            }

            // Add formatted series for this source
            $formattedData[] = [
                'name' => $source,
                'data' => $seriesData
            ];
        }

        $totalSeries = [];
        $averageSeries = [];

        foreach ($months as $month) {
            $totalSeries[] = round($revenueData[$month]['total'] ?? 0, 2);
            $averageSeries[] = round($revenueData[$month]['average'] ?? 0, 2);
        }

        $formattedData[] = [
            'name' => 'Total Revenue',
            'data' => $totalSeries
        ];

        $formattedData[] = [
            'name' => 'Average Order Amount',
            'data' => $averageSeries
        ];

        return response()->json([
            'categories' => $months,
            'series' => $formattedData
        ], 200);
    }

    public function checkIns()
    {
        // Get today's date and the date from 7 days ago
        $today = Carbon::now();
        $sevenDaysAgo = Carbon::now()->subDays(6)->startOfDay();

        // Query to get check-ins for the last 7 days
        $checkIns = Log::select(
            DB::raw('DATE_FORMAT(created_at, "%a, %d") as day'), // Format day as "Mon 01"
            DB::raw('COUNT(*) as total') // Count the number of check-ins
        )
            ->where('type', 'check-in')
            ->whereBetween('created_at', [$sevenDaysAgo, $today]) // Filter last 7 days
            ->groupBy('day') // Group by formatted day
            ->orderBy('created_at', 'ASC') // Order by day
            ->get()->mapWithKeys(function ($item) {
                return [$item->day => $item->total];
            });

        $days = $this->graphDays(); // Assuming this generates a list of days (D, d)
        $formattedData = [];

        foreach ($days as $day) {
            $formattedData[$day] = $checkIns[$day] ?? 0;
        }

        return response()->json($formattedData);
    }
}

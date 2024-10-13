<?php

namespace App\Http\Controllers;

use Coderstm\Coderstm;
use App\Models\Booking;
use Coderstm\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Builder;

class KPIController extends Controller
{
    public function newMembers(Request $request)
    {
        $dates = $this->compateDates();
        $currentMonthStart = $dates['currentMonthStart'];
        $currentDate = $dates['currentDate'];
        $previousMonthStart = $dates['previousMonthStart'];
        $previousMonthEnd = $dates['previousMonthEnd'];

        // Query new members for the current month
        $newMembersCurrentMonth = Coderstm::$userModel::whereBetween('created_at', [$currentMonthStart, $currentDate])->count();

        // Query new members for the previous month (until the adjusted previous month date)
        $newMembersPreviousMonth = Coderstm::$userModel::whereBetween('created_at', [$previousMonthStart, $previousMonthEnd])->count();

        // Calculate the percentage change
        $percentageChange = 0;
        if ($newMembersPreviousMonth > 0) {
            $percentageChange = round((($newMembersCurrentMonth - $newMembersPreviousMonth) / $newMembersPreviousMonth) * 100, 2);
        }

        return [
            'current' => $newMembersCurrentMonth,
            'previous' => $newMembersPreviousMonth,
            'percentage' => $percentageChange,
            'negative' => $newMembersCurrentMonth <  $newMembersPreviousMonth,
            "description" => "Joined since {$currentMonthStart->format('d M')} compared with {$previousMonthStart->format('d M')} to {$previousMonthEnd->format('d M')}",
        ];
    }

    public function visitsToday(Request $request)
    {
        $currentDate = Carbon::now();
        $todayStart = Carbon::now()->startOfDay();
        $comparisonDateStart = Carbon::now()->subDay()->startOfDay();
        $comparisonDateEnd = Carbon::now()->subDay()->setTime($currentDate->hour, $currentDate->minute, $currentDate->second);

        // Query successful visits for today so far (up to the current time)
        $visitsToday = Log::whereBetween('created_at', [$todayStart, $currentDate])
            ->where('type', 'check-in')
            ->count();

        // Query successful visits for the same time on 16th September
        $visitsOnComparisonDate = Log::whereBetween('created_at', [$comparisonDateStart, $comparisonDateEnd])
            ->where('type', 'check-in')
            ->count();

        // Calculate the percentage change
        $percentageChange = 0;
        if ($visitsOnComparisonDate > 0) {
            $percentageChange = round((($visitsToday - $visitsOnComparisonDate) / $visitsOnComparisonDate) * 100, 2);
        }

        return [
            'current' => $visitsToday,
            'previous' => $visitsOnComparisonDate,
            'percentage' => $percentageChange,
            'negative' => $visitsToday < $visitsOnComparisonDate,
            'description' => "Successful visits today so far compared with the same time on 16th Sep {$comparisonDateEnd->format('h:i a')}",
        ];
    }

    public function memberVisitsThisMonth(Request $request)
    {
        $dates = $this->compateDates();
        $currentMonthStart = $dates['currentMonthStart'];
        $currentDate = $dates['currentDate'];
        $previousMonthStart = $dates['previousMonthStart'];
        $previousMonthEnd = $dates['previousMonthEnd'];

        // Query member visits for the current month (from 1st Sep to today)
        $visitsCurrentMonth = Log::whereBetween('created_at', [$currentMonthStart, $currentDate])
            ->where('type', 'check-in')  // Assuming the type 'check-in' tracks member visits
            ->count();

        // Query member visits for the previous month (from 1st Aug to 23rd Aug)
        $visitsPreviousMonth = Log::whereBetween('created_at', [$previousMonthStart, $previousMonthEnd])
            ->where('type', 'check-in')
            ->count();

        // Calculate the percentage change
        $percentageChange = 0;
        if ($visitsPreviousMonth > 0) {
            $percentageChange = round((($visitsCurrentMonth - $visitsPreviousMonth) / $visitsPreviousMonth) * 100, 2);
        }

        return [
            'current' => $visitsCurrentMonth,
            'previous' => $visitsPreviousMonth,
            'percentage' => $percentageChange,
            'negative' => $visitsCurrentMonth < $visitsPreviousMonth,
            'description' => "Visits from {$currentMonthStart->format('d M')} compared with {$previousMonthStart->format('d M')} to {$previousMonthEnd->format('d M')}",
        ];
    }

    public function bookingsThisMonth(Request $request)
    {
        $dates = $this->compateDates();
        $currentMonthStart = $dates['currentMonthStart'];
        $currentDate = $dates['currentDate'];
        $previousMonthStart = $dates['previousMonthStart'];
        $previousMonthEnd = $dates['previousMonthEnd'];

        // Query bookings for the current month (from 1st Sep to today)
        $bookingsCurrentMonth = Booking::whereBetween('created_at', [$currentMonthStart, $currentDate])->count();

        // Query bookings for the previous month (from 1st Aug to 23rd Aug)
        $bookingsPreviousMonth = Booking::whereBetween('created_at', [$previousMonthStart, $previousMonthEnd])->count();

        // Calculate the percentage change
        $percentageChange = 0;
        if ($bookingsPreviousMonth > 0) {
            $percentageChange = round((($bookingsCurrentMonth - $bookingsPreviousMonth) / $bookingsPreviousMonth) * 100, 2);
        }

        return [
            'current' => $bookingsCurrentMonth,
            'previous' => $bookingsPreviousMonth,
            'percentage' => $percentageChange,
            'negative' => $bookingsCurrentMonth < $bookingsPreviousMonth,
            'description' => "Bookings from {$currentMonthStart->format('d M')} compared with {$previousMonthStart->format('d M')} to {$previousMonthEnd->format('d M')}",
        ];
    }

    public function onlineSignupsThisMonth(Request $request)
    {
        $dates = $this->compateDates();
        $currentMonthStart = $dates['currentMonthStart'];
        $currentDate = $dates['currentDate'];
        $previousMonthStart = $dates['previousMonthStart'];
        $previousMonthEnd = $dates['previousMonthEnd'];

        // Query online signups for the current month (from 1st Sep to today)
        $signupsCurrentMonth = Coderstm::$userModel::whereDoesntHave('createdBy', function (Builder $query) {
            $query->whereNotNull('admin_id');
        })
            ->whereBetween('created_at', [$currentMonthStart, $currentDate])
            ->count();

        // Query online signups for the previous month (from 1st Aug to 23rd Aug)
        $signupsPreviousMonth = Coderstm::$userModel::whereDoesntHave('createdBy', function (Builder $query) {
            $query->whereNotNull('admin_id');
        })
            ->whereBetween('created_at', [$previousMonthStart, $previousMonthEnd])
            ->count();

        // Calculate the percentage change
        $percentageChange = 0;
        if ($signupsPreviousMonth > 0) {
            $percentageChange = round((($signupsCurrentMonth - $signupsPreviousMonth) / $signupsPreviousMonth) * 100, 2);
        }

        return [
            'current' => $signupsCurrentMonth,
            'previous' => $signupsPreviousMonth,
            'percentage' => $percentageChange,
            'negative' => $signupsCurrentMonth < $signupsPreviousMonth,
            'description' => "Online signups from {$currentMonthStart->format('d M')} compared with {$previousMonthStart->format('d M')} to {$previousMonthEnd->format('d M')}",
        ];
    }

    public function onlineBookingsThisMonth(Request $request)
    {
        $dates = $this->compateDates();
        $currentMonthStart = $dates['currentMonthStart'];
        $currentDate = $dates['currentDate'];
        $previousMonthStart = $dates['previousMonthStart'];
        $previousMonthEnd = $dates['previousMonthEnd'];

        // Query online bookings for the current month (from 1st Sep to today)
        $bookingsCurrentMonth = Booking::where('source', true)
            ->whereBetween('created_at', [$currentMonthStart, $currentDate])
            ->count();

        // Query online bookings for the previous month (from 1st Aug to 23rd Aug)
        $bookingsPreviousMonth = Booking::where('source', true)
            ->whereBetween('created_at', [$previousMonthStart, $previousMonthEnd])
            ->count();

        // Calculate the percentage change
        $percentageChange = 0;
        if ($bookingsPreviousMonth > 0) {
            $percentageChange = round((($bookingsCurrentMonth - $bookingsPreviousMonth) / $bookingsPreviousMonth) * 100, 2);
        }

        return [
            'current' => $bookingsCurrentMonth,
            'previous' => $bookingsPreviousMonth,
            'percentage' => $percentageChange,
            'negative' => $bookingsCurrentMonth < $bookingsPreviousMonth,
            'description' => "Online bookings from {$currentMonthStart->format('d M')} compared with {$previousMonthStart->format('d M')} to {$previousMonthEnd->format('d M')}",
        ];
    }

    private function compateDates(): array
    {
        // Get the first day of the current month (e.g., 1st September)
        $currentMonthStart = Carbon::now()->startOfMonth();
        // Get today's date in the current month
        $currentDate = Carbon::now();

        // Get the first day of the previous month (e.g., 1st August)
        $previousMonthStart = Carbon::now()->subMonth()->startOfMonth();
        // Get the last day of the previous month
        $previousMonthEnd = Carbon::now()->subMonth()->endOfMonth();

        // If the current date is greater than the end of the previous month,
        // compare to the end of the previous month.
        if ($currentDate->day > $previousMonthEnd->day) {
            $previousMonthEnd = $previousMonthEnd;
        } else {
            // Otherwise, compare to the same day in the previous month.
            $previousMonthEnd = Carbon::now()->subMonth()->day($currentDate->day);
        }

        return [
            'currentMonthStart' => $currentMonthStart,
            'currentDate' => $currentDate,
            'previousMonthStart' => $previousMonthStart,
            'previousMonthEnd' => $previousMonthEnd,
        ];
    }
}

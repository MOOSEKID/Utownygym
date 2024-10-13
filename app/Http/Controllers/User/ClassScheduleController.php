<?php

namespace App\Http\Controllers\User;

use Carbon\Carbon;
use App\Models\User;
use Coderstm\Models\Shop\Order;
use Coderstm\Traits\Helpers;
use Illuminate\Http\Request;
use App\Models\ClassSchedule;
use App\Events\BookingCreated;
use Coderstm\Services\Resource;
use App\Http\Controllers\Controller;

class ClassScheduleController extends Controller
{
    use Helpers;

    public function index(Request $request, ClassSchedule $classSchedule)
    {
        $startOfWeek = $request->filled('startOfWeek') ? Carbon::parse($request->startOfWeek)->startOfWeek() : now()->startOfWeek();
        $otherSortBy = $request->otherSortBy;

        $classSchedule = $classSchedule->whereBetween('date_at',  [now(), now()->addDays(6)->endOfDay()]);

        if ($request->filled('filter')) {
            $classSchedule->whereHas('class', function ($q) use ($request) {
                $q->where('name', 'like', "{$request->filter}%");
            })->orWhereHas('instructor', function ($q) use ($request) {
                $q->where('name', 'like', "{$request->filter}%");
            });
        }

        $classSchedule->orderByRaw('DATE(date_at)');

        if ($otherSortBy == 'instructor_id') {
            $classSchedule->orderByRaw('(SELECT CONCAT(first_name," ",last_name) FROM admins WHERE admins.id = class_schedules.instructor_id)');
        } else if ($otherSortBy == 'class_id') {
            $classSchedule->orderByRaw('(SELECT name FROM class_lists WHERE class_lists.id = class_schedules.class_id)');
        } else {
            $classSchedule->orderBy($otherSortBy ?? 'start_at', 'asc');
        }

        $classSchedule =  $classSchedule->get()->map(function ($item) use ($request) {
            $item->is_booked = $item->isBooked(user()->id);
            return $item;
        });

        $hasNext = $startOfWeek->eq(now()->startOfWeek());

        return response()->json([
            'data' => $classSchedule,
            'totalCost' => $classSchedule->sum('cost'),
            'startOfWeek' => $startOfWeek->format('Y-m-d'),
            'nextOfWeek' => $startOfWeek->addWeek()->format('Y-m-d'),
            'previousOfWeek' => $hasNext ? false : $startOfWeek->subWeeks(2)->format('Y-m-d'),
        ], 200);
    }

    public function book(Request $request, ClassSchedule $classSchedule)
    {
        $user = user();

        // Check if the class is bookable
        if (!$classSchedule->bookable) {
            return $this->abortBooking(403, 'messages.not_bookable');
        }

        // Check if the class date has passed
        if ($classSchedule->date_at->lt(now())) {
            return $this->abortBooking(403, 'messages.booking_class_started');
        }

        // Check if the user has already booked the class
        if ($classSchedule->has_booked) {
            return $this->abortBooking(403, 'messages.booking_standby');
        }

        // Check if the user is blocked
        if ($this->isUserBlocked($user)) {
            return $this->abortBooking(403, 'messages.booking_blocked', [
                'date' => $user->blocked->release_at->format('d/m/Y')
            ]);
        }

        // Check if the user can book the class
        $bookingStatus = $this->canBookClass($user, $classSchedule);
        if ($bookingStatus !== true) {
            $order = $this->createBookingOrder($classSchedule, $user);
            return $this->paymentRequiredResponse($order, $bookingStatus);
        }

        // Confirm the booking
        $booking = $classSchedule->confirmBooking($user);
        event(new BookingCreated($booking, $booking->is_standby));

        return response()->json([
            'message' => trans('messages.class_booked'),
        ], 200);
    }

    // Helper methods for readability
    private function abortBooking($statusCode, $messageKey, $replace = [])
    {
        abort($statusCode, trans($messageKey, $replace));
    }

    private function isUserBlocked($user)
    {
        return $user->has_blocked;
    }

    private function canBookClass($user, $classSchedule)
    {
        if (!$user->is_subscribed && $classSchedule->cost > 0) {
            return 'coderstm::messages.subscription.none';
        }

        if ($user->subscription() && !$user->subscription()->canUseFeature('classes') && $classSchedule->cost > 0) {
            return 'messages.no_booking_credit';
        }

        return true;
    }

    private function paymentRequiredResponse($order, $messageKey)
    {
        return response()->json([
            'payment' => ['key' => $order->key, 'amount' => $order->total()],
            'message' => trans($messageKey),
        ], 200);
    }


    private function createBookingOrder(ClassSchedule $schedule, User $user): Order
    {
        return Order::modifyOrCreate(new Resource([
            'contact' => $user->only('email', 'phone_number'),
            'collect_tax' => $user->collect_tax,
            'customer_id' => $user->id,
            'source' => 'Schedule',
            'orderable_id' => $schedule->id,
            'orderable_type' => ClassSchedule::class,
            'billing_address' => $user->address->toArray(),
            'line_items' => [
                [
                    "title" => $schedule->title(),
                    "variant_title" => '',
                    "is_custom" => true,
                    "price" => $schedule->cost,
                    "quantity" => 1,
                    "taxable" => true,
                ]
            ]
        ]));
    }
}

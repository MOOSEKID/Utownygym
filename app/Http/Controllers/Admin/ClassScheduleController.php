<?php

namespace App\Http\Controllers\Admin;

use Carbon\Carbon;
use App\Models\ClassList;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\ClassSchedule;

class ClassScheduleController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(ClassSchedule::class);
    }

    /**
     * Display a listing of the week.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, ClassSchedule $classSchedule)
    {
        $startOfWeek = $request->filled('startOfWeek') ? Carbon::parse($request->startOfWeek)->startOfWeek() : now()->startOfWeek();

        $classSchedule = $classSchedule->where('start_of_week', $startOfWeek);

        if ($request->boolean('hasClass')) {
            $classSchedule->has('class');
        }

        if ($request->boolean('deleted')) {
            $classSchedule->onlyTrashed();
        }

        return response()->json([
            'data' => $classSchedule->orderBy('day_index')->orderBy('start_at')->get(),
            'startOfWeek' => $startOfWeek->format('Y-m-d'),
            'nextOfWeek' => $startOfWeek->addDays(7)->startOfWeek()->format('Y-m-d'),
            'previousOfWeek' => $startOfWeek->subDays(8)->startOfWeek()->format('Y-m-d'),
        ], 200);
    }

    /**
     * Display a listing of the week.
     *
     * @return \Illuminate\Http\Response
     */
    public function shared(Request $request, ClassSchedule $classSchedule)
    {
        $startOfWeek = $request->filled('startOfWeek') ? Carbon::parse($request->startOfWeek)->startOfWeek() : now()->startOfWeek();

        $classSchedule = $classSchedule->where('start_of_week', $startOfWeek);

        if ($request->boolean('hasClass')) {
            $classSchedule->has('class');
        }

        if ($request->boolean('deleted')) {
            $classSchedule->onlyTrashed();
        }
        $classSchedule = $classSchedule->orderBy('day_index')->orderBy('start_at')->get();

        return response()->json($classSchedule->map(function ($item) {
            return [
                'id' => $item->id,
                'title' => $item->location ? "{$item->class->name} - {$item->location->label}" : $item->class->name,
                'location' => optional($item->location)->label,
                'instructor' => optional($item->instructor)->name,
                'class_name' => $item->class->name,
                'class_description' => $item->has_description ? $item->class->description : null,
                'start' => Carbon::parse("{$item->date_at->format('Y-m-d')} {$item->start_at}"),
                'end' => Carbon::parse("{$item->date_at->format('Y-m-d')} {$item->end_at}"),
                'color' => $item->has_sign_off ? '#dc3545' : null,
            ];
        }), 200);
    }

    /**
     * Updated class schedules of the week.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rules = [
            'start_of_week' => 'required',
            'class_schedules' => 'required|array',
            'class_schedules.*.start_at' => 'required',
            'class_schedules.*.end_at' => 'required',
        ];

        // Validate those rules
        $this->validate($request, $rules);

        $classSchedules = collect($request->class_schedules);

        // remove the deleted class schedules
        ClassSchedule::where('start_of_week', Carbon::parse($request->start_of_week))
            ->whereNotIn('id', $classSchedules->pluck('id')->filter())
            ->delete();

        // Update or create the class schedules
        $classSchedules->map(function ($item) {
            return (object) $item;
        })->each(function ($schedule) {
            $scheduleId = optional($schedule)->id;
            $scheduleDay = optional($schedule)->day;
            $startOfWeek = optional($schedule)->start_of_week;
            $startAt = optional($schedule)->start_at;
            $endAt = optional($schedule)->end_at;
            $classId = optional($schedule)->class['id'] ?? null;
            $locationId = optional($schedule)->location['id'] ?? null;
            $instructorId = optional($schedule)->instructor['id'] ?? null;
            $classCapacity = optional(ClassList::find($classId))->capacity;

            ClassSchedule::updateOrCreate([
                'id' => $scheduleId
            ], [
                'day' => $scheduleDay,
                'start_of_week' => $startOfWeek,
                'start_at' => $startAt,
                'end_at' => $endAt,
                'class_id' => $classId,
                'capacity' => $classCapacity,
                'location_id' => $locationId,
                'instructor_id' => $instructorId,
            ]);
        });

        return response()->json([
            'message' => trans('messages.update_class_schedule_weeks'),
        ], 200);
    }
}

<?php

namespace Database\Factories;

use Carbon\Carbon;
use Coderstm\Coderstm;
use App\Models\Location;
use App\Models\ClassList;
use App\Models\Instructor;
use App\Models\ClassSchedule;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Instructor>
 */
class ClassScheduleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $start_at = fake()->time('H:i');
        $end_at = Carbon::parse($start_at)->addMinutes(30, 60)->format('H:i');
        $class = ClassList::inRandomOrder()->has('instructors')->first();
        $classId = $class->id;
        $capacity = $class->capacity;
        return [
            'day' => ['Monday',  'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][rand(0, 6)],
            'start_at' => $start_at,
            'end_at' => $end_at,
            'start_of_week' => Carbon::parse(fake()->dateTimeBetween('-1 years', '+2 weeks'))->startOfWeek()->format('Y-m-d'),
            'class_id' => $classId,
            'capacity' => $capacity,
            'location_id' => Location::inRandomOrder()->first()->id,
            'instructor_id' => Instructor::inRandomOrder()->whereHas('classes', function ($q) use ($classId) {
                $q->where('id', $classId);
            })->first()->id,
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (ClassSchedule $classSchedule) {
            if ($classSchedule->date_at->lte(now())) {
                $classSchedule->update([
                    'sign_off_at' => $classSchedule->date_at
                ]);
            }

            foreach ($classSchedule->active_bookings as $index => $booking) {
                if (rand(0, 1) || $index >= 5) {
                    $booking->update(['attendance' => true]);
                    $booking->user->logs()->create([
                        'type' => 'check-in',
                        'message' => $message ?? 'Successfully checked in at ' . $classSchedule->date_at->format(Coderstm::$dateTimeFormat),
                        'created_at' => $booking->schedules_at,
                        'updated_at' => $booking->schedules_at,
                    ]);
                }
            }
        });
    }
}

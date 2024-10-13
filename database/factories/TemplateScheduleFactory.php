<?php

namespace Database\Factories;

use Carbon\Carbon;
use App\Models\Location;
use App\Models\ClassList;
use App\Models\Instructor;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Instructor>
 */
class TemplateScheduleFactory extends Factory
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
        $classId = ClassList::inRandomOrder()->has('instructors')->first()->id;

        return [
            'day' => ['Monday',  'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][rand(0, 6)],
            'start_at' => $start_at,
            'end_at' => $end_at,
            'class_id' => $classId,
            'location_id' => Location::inRandomOrder()->first()->id,
            'instructor_id' => Instructor::inRandomOrder()->whereHas('classes', function ($q) use ($classId) {
                $q->where('id', $classId);
            })->first()->id,
        ];
    }
}

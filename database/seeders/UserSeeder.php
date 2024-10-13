<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Coderstm\Models\Subscription;
use Illuminate\Console\View\Components\TwoColumnDetail;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $startTime = microtime(true);
        try {
            User::factory()->count(1000)
                ->create()
                ->each(function ($user) {
                    try {
                        $type = ['trialing', 'canceled', 'incomplete', 'incompleteAndExpired', 'pastDue', 'unpaid',][rand(0, 5)];

                        $sub = Subscription::factory()->{$type}()->create([
                            'created_at' => $user->created_at,
                            'user_id' => $user->id,
                        ]);

                        if ($type === 'pastDue') {
                            $sub->paymentConfirmation(null);
                        }
                    } catch (\Exception $e) {
                        throw $e;
                    }
                });
        } catch (\Exception $e) {
            $runTime = number_format((microtime(true) - $startTime) * 1000);
            with(new TwoColumnDetail($this->command->getOutput()))->render(
                $e->getMessage(),
                "<fg=gray>$runTime ms</> <fg=red;options=bold>ERROR</>"
            );
            report($e);
            $this->command->getOutput()->writeln('');
        }
    }
}

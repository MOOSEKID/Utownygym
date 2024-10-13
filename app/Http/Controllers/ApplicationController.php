<?php

namespace App\Http\Controllers;

use App\Models\Enquiry;
use Coderstm\Models\Task;
use Illuminate\Http\Request;
use Coderstm\Models\AppSetting;
use Coderstm\Models\Subscription;
use Coderstm\Models\PaymentMethod;
use Illuminate\Support\Facades\DB;
use Coderstm\Http\Controllers\ApplicationController as Controller;

class ApplicationController extends Controller
{
    public function stats(Request $request)
    {
        return response()->json([
            'total' => Subscription::query()->count(),
            'rolling' => Subscription::query()->active()->count(),
            'end_date' => Subscription::query()->ended()->count(),
            'free' => Subscription::query()->active()->free()->count(),
            'max_year' => Subscription::query()->max(DB::raw("DATE_FORMAT(subscriptions.created_at,'%Y')")) ?? date('Y'),
            'min_year' => "2000",
            'unread_support' => Enquiry::onlyActive()->count(),
            'unread_tasks' => Task::onlyActive()->count(),
        ], 200);
    }

    public function config(Request $request)
    {
        $response = [];
        $config = AppSetting::findByKey('config')->filter(function ($item, $key) {
            return !in_array($key, ['license_key']);
        });

        if ($request->filled('includes')) {
            foreach ($request->includes ?? [] as $item) {
                if ($item === 'payment-methods') {
                    $response[$item] = PaymentMethod::toPublic();
                } else {
                    $response[$item] = AppSetting::findByKey($item);
                }
            }

            $response['config'] = $config;
            return response()->json($response, 200);
        }

        return response()->json($config, 200);
    }
}

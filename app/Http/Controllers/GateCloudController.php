<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Middleware\VerifyGateCloudToken;
use App\Models\AccessCard;
use App\Models\GateCloudDevice;

class GateCloudController extends Controller
{
    public function __construct()
    {
        $this->middleware(VerifyGateCloudToken::class);
    }

    function handleWebhook(Request $request)
    {
        $payload = $request->payload;
        $method = 'handle' . Str::studly(str_replace('.', '_', $request->type));

        if (method_exists($this, $method)) {
            $this->{$method}($payload);
        }

        return response()->json(true, 200);
    }

    protected function handleUsersLogCreated(array $payload)
    {
        logger($payload);
    }

    protected function handleReaderCardScaned(array $payload)
    {
        AccessCard::updateOrCreate([
            'number' => $payload['cardNumber']
        ]);
    }

    protected function handleDeviceLists(array $payload)
    {
        GateCloudDevice::updateOrCreate($payload);
    }
}

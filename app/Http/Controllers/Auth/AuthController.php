<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Requests\UpdateParqRequest;
use App\Notifications\AvatarAttachedNotification;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Coderstm\Http\Controllers\Auth\AuthController as Controller;

class AuthController extends Controller
{
    public function update(Request $request, $guard = 'users')
    {
        $user = user();

        // Validate those rules
        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'address.line1' => 'required',
            'address.city' => 'required',
            'address.postal_code' => 'required',
            'address.country' => 'required',
            'email' => "email|unique:{$guard},email,{$user->id}",
        ]);

        $user->update($request->only([
            'first_name',
            'last_name',
            'email',
            'phone_number',
        ]));

        // add address to the user
        $user->updateOrCreateAddress($request->input('address'));

        if ($request->filled('avatar')) {
            $user->avatar()->sync([
                $request->input('avatar.id') => [
                    'type' => 'avatar'
                ]
            ]);

            if (is_user()) {
                $user->update([
                    'request_avatar' => false
                ]);
                admin_notify(new AvatarAttachedNotification($user->fresh('avatar')));
            }
        }

        return $this->me($guard);
    }

    public function updateParq(UpdateParqRequest $request)
    {
        $answers = [];

        foreach ($request->fields as $field) {
            $answers[$field['key']] = isset($field['config']['value']) ? $field['config']['value'] : null;
        }

        $request->merge(['answers' => $answers]);

        user()->updateOrCreateParq($request->input());

        user()->update([
            'request_parq' => false
        ]);

        $user = user()->fresh(['parq']);

        return response()->json([
            'data' =>  $user->parq,
            'message' => trans('messages.parq_updated'),
        ], 200);
    }

    public function checkinHistory(Request $request)
    {
        $logs = user()->logs()->whereIn('type', ['check-in', 'access-denied']);

        if ($request->filled('status')) {
            $logs->where('type', $request->status);
        }

        $logs = $logs->orderBy($request->sortBy ?? 'created_at', $request->direction ?? 'desc')
            ->paginate($request->rowsPerPage ?? 15);

        return new ResourceCollection($logs);
    }
}

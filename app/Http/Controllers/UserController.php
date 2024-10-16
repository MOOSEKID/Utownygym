<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use League\Csv\Reader;
use App\Models\Booking;
use Coderstm\Models\File;
use Coderstm\Models\Import;
use Coderstm\Enum\AppStatus;
use Coderstm\Traits\Helpers;
use Illuminate\Http\Request;
use App\Models\ClassSchedule;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Coderstm\Jobs\ProcessCsvImport;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Response;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Resources\Json\ResourceCollection;

class UserController extends Controller
{
    use Helpers;

    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(User::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, User $user)
    {
        $user = $user->with($request->includes ?? []);
        $isCancelled = $request->filled('type') && $request->type == 'cancelled';

        if ($request->filled('month') || $request->filled('year')) {
            $column = $isCancelled ? 'ends_at' : 'created_at';
            $user->whereDateColumn([
                'month' => $request->month,
                'year' => $request->year,
                'day' => $request->day
            ], $column);
        }

        if ($request->filled('filter')) {
            if (str($request->filter)->startsWith('email:')) {
                $filter = str($request->filter)->replace('email:', '');
                $user->where('email', 'like', "{$filter}%");
            } else {
                $user->where(DB::raw("CONCAT(first_name,' ',last_name)"), 'like', "%{$request->filter}%");
            }
        }

        if ($request->boolean('isEnquiry')) {
            $user->onlyEnquiry();
            if ($request->filled('status')) {
                $user->where('status', $request->input('status'));
            }
        } else if ($request->boolean('option')) {
            $user->whereIn('status', [AppStatus::ACTIVE, AppStatus::PENDING]);
        } else if ($isCancelled) {
            $user->onlyCancelled();;
        } else {
            $user->onlyMember();

            if ($request->boolean('status')) {
                $user->onlyActive();
            } else if ($request->status == 'late-cancellation') {
                $user->onlyLateCancellation();
            } else if ($request->status == 'no-show') {
                $user->onlyNoShow();
            } else if ($request->status == 'blocked') {
                $user->onlyBlocked();
            }

            if ($request->filled('type')) {
                $user->whereTyped($request->input('type'));
            }
        }

        if ($request->boolean('blocked')) {
            $user->onlyUnblocked();
        }

        if ($request->filled('rag')) {
            $user->where('rag', $request->rag);
        }

        if ($request->boolean('deleted')) {
            $user->onlyTrashed();
        }

        $users = $user->sortBy($request->sortBy ?? 'created_at', $request->direction ?? 'desc')
            ->paginate($request->rowsPerPage ?? 15);

        return new ResourceCollection($users);
    }

    /**
     * Display a options listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function options(Request $request, User $user)
    {
        $request->merge([
            'option' => true
        ]);
        return $this->index($request, $user);
    }

    /**
     * Display a listing of the resource by ids.
     *
     * @return \Illuminate\Http\Response
     */
    public function listByIds(Request $request, User $user)
    {
        return $user->whereIn('id', $request->ids)->get();
    }

    /**
     * Display a enquiry listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function enquiry(Request $request, User $user)
    {
        $request->merge([
            'isEnquiry' => true,
        ]);
        return $this->index($request, $user);
    }

    /**
     * Display a finance membership listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function financeMemberships(Request $request, User $user)
    {
        $request->merge([
            'finance' => true,
            'mem_rec' => true,
        ]);
        return $this->index($request, $user);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, User $user)
    {
        // Validate those rules
        $request->validate([
            'email' => 'required|email|unique:users',
            'first_name' => 'required',
            'last_name' => 'required',
            'note' => 'required_if:status,Active',
            'password' => 'confirmed',
            'address.line1' => 'required',
            'address.city' => 'required',
            'address.postal_code' => 'required',
            'address.country' => 'required',
        ]);

        $request->merge([
            'password' => bcrypt($request->password ?? str()->random(6)),
        ]);

        // create the user
        $user = User::create($request->input());

        // add address to the user
        $user = $user->updateOrCreateAddress($request->input('address'));

        if ($request->filled('avatar')) {
            $user->avatar()->sync([
                $request->input('avatar.id') => [
                    'type' => 'avatar'
                ]
            ]);
        }

        return response()->json([
            'data' => $user->fresh(['address', 'notes']),
            'message' => trans('coderstm::messages.users.store'),
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return response()->json($user->load(['notes', 'parq']), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        // Validate those rules
        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'release_at' => 'required_if:status,Hold',
            'email' => "email|unique:users,email,{$user->id}",
            'password' => 'confirmed',
            'address.line1' => 'required',
            'address.city' => 'required',
            'address.postal_code' => 'required',
            'address.country' => 'required',
        ]);

        if ($request->filled('password')) {
            $request->merge([
                'password' => bcrypt($request->password),
            ]);
        }

        $user->update($request->input());

        if ($request->filled('avatar')) {
            $user->avatar()->sync([
                $request->input('avatar.id') => [
                    'type' => 'avatar'
                ]
            ]);
        }

        if ($request->filled('special_note')) {
            $user->notes()->create([
                'type' => 'notes',
                'message' => $request->special_note,
            ]);
        }

        if ($request->filled('ends_at')) {
            $user = $user->updateEndsAt($request->ends_at);
        }

        $user->updateOrCreateAddress($request->input('address'));

        return response()->json([
            'data' => $user->fresh(['address', 'notes', 'parq']),
            'message' => trans('coderstm::messages.users.updated'),
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json([
            'message' => trans_choice('coderstm::messages.users.destroy', 1),
        ], 200);
    }

    /**
     * Remove the selected resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroySelected(Request $request, User $user)
    {
        $this->validate($request, [
            'items' => 'required',
        ]);
        $user->whereIn('id', $request->items)->each(function ($item) {
            $item->delete();
        });
        return response()->json([
            'message' => trans_choice('coderstm::messages.users.destroy', 2),
        ], 200);
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        $user = User::onlyTrashed()->findOrFail($id);
        $user->restore();

        return response()->json([
            'message' => trans_choice('coderstm::messages.users.restored', 1),
        ], 200);
    }

    /**
     * Restore the selected resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function restoreSelected(Request $request, User $user)
    {
        $this->validate($request, [
            'items' => 'required',
        ]);
        $user->onlyTrashed()
            ->whereIn('id', $request->items)->each(function ($item) {
                $item->restore();
            });
        return response()->json([
            'message' => trans_choice('coderstm::messages.users.restored', 2),
        ], 200);
    }

    /**
     * Send reset password request to specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function resetPasswordRequest(Request $request, User $user)
    {
        $status = Password::sendResetLink([
            'email' => $user->email,
        ]);

        return response()->json([
            'status' => $status,
            'message' => trans('coderstm::messages.users.password'),
        ], 200);
    }

    /**
     * Change active of specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function changeActive(Request $request, User $user)
    {
        $user->update([
            'is_active' => !$user->is_active
        ]);

        $type = !$user->is_active ? 'archived' : 'unarchive';

        return response()->json([
            'message' => trans('coderstm::messages.users.status', ['type' => trans('coderstm::messages.attributes.' . $type)]),
        ], 200);
    }

    /**
     * Change checked specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function checked(Request $request, User $user)
    {
        $user->update([
            'checked' => !$user->checked
        ]);

        return response()->json([
            'message' => trans_status('status', 'member', $user->checked ? 'checked' : 'unchecked'),
        ], 200);
    }

    /**
     * Change request_parq of specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function requestParq(Request $request, User $user)
    {
        $user->update([
            'request_parq' => !$user->request_parq
        ]);

        return response()->json([
            'message' => trans_attribute('member_parq_request', $user->request_parq ? 'checked' : 'unchecked')
        ], 200);
    }

    /**
     * Change request_avatar of specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function requestAvatar(Request $request, User $user)
    {
        $user->update([
            'request_avatar' => !$user->request_avatar
        ]);

        return response()->json([
            'message' => trans_attribute('member_avater_request', $user->request_avatar ? 'checked' : 'unchecked')
        ], 200);
    }

    /**
     * Display a schedules listing of specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function schedules(Request $request, User $user)
    {
        ClassSchedule::resolveRelationUsing('booking', function ($schedule) use ($user) {
            return $schedule->hasOne(Booking::class, 'schedule_id')->withOnly([])->where('user_id', $user->id);
        });

        $classes = ClassSchedule::with('booking')->whereHas('booking', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        });

        if ($request->filled('filter')) {
            $classes->whereHas('class', function ($query) use ($request) {
                $query->where('name', 'like', "%{$request->filter}%");
            });
        }

        if ($request->filled('date_from') && $request->filled('date_to')) {
            $date_from = Carbon::parse($request->input('date_from'))->startOfDay();
            $date_to = Carbon::parse($request->input('date_to'))->endOfDay();
            $classes->whereBetween('date_at', [$date_from, $date_to]);
        } else if ($request->filled('date')) {
            $date = Carbon::parse($request->input('date'));
            $classes->whereDate('date_at', $date);
        }

        if ($request->filled('status')) {
            switch ($request->status) {
                case 'active':
                    $classes->whereRaw('date_at >= CURDATE()')
                        ->whereHas('bookings', function ($q) use ($user) {
                            $q->where('user_id', $user->id)
                                ->onlyNotCanceled();
                        });
                    break;

                case 'cancelled':
                    $classes->whereHas('bookings', function ($q) use ($user) {
                        $q->where('user_id', $user->id)
                            ->onlyCanceled();
                    });
                    break;

                case 'late-cancellation':
                    $classes->whereHas('bookings', function ($q) use ($user) {
                        $q->where('user_id', $user->id)
                            ->onlyLateCancellation();
                    });
                    break;

                case 'attended':
                    $classes->whereHas('bookings', function ($q) use ($user) {
                        $q->where('user_id', $user->id)
                            ->onlyAttended();
                    });
                    break;

                case 'noshow':
                    $classes->whereHas('bookings', function ($q) use ($user) {
                        $q->where('user_id', $user->id)
                            ->onlyNoShow();
                    });
                    break;
            }
        }

        $classes = $classes->orderBy($request->sortBy ?? 'created_at', $request->direction ?? 'desc')
            ->paginate($request->rowsPerPage ?? 15);
        return new ResourceCollection($classes);
    }

    public function schedulesCalendar(Request $request, User $user)
    {
        ClassSchedule::resolveRelationUsing('booking', function ($schedule) use ($user) {
            return $schedule->hasOne(Booking::class, 'schedule_id')->withOnly([])->where('user_id', $user->id);
        });

        $classSchedule = ClassSchedule::with('booking')->whereHas('booking', function ($query) use ($request) {
            if ($request->boolean('activeOnly')) {
                $query->onlyNotCanceled();
            }
        });

        $start = Carbon::parse($request->input('start'))->startOfDay();
        $end = Carbon::parse($request->input('end'))->endOfDay();
        $classSchedule = $classSchedule->whereBetween('date_at', [$start, $end]);

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
                'class' => optional($item->class)->name,
                'booking' => [
                    'id' => $item->booking->id,
                    'cancelable' => $item->booking->cancelable,
                    'user_id' => $item->booking->user_id,
                    'canceled_at' => $item->booking->canceled_at,
                ],
                'description' => $item->has_description ? $item->class->description : "",
                'start' => Carbon::parse("{$item->date_at->format('Y-m-d')} {$item->start_at}")->format('Y-m-d\\TH:i:sP'),
                'end' => Carbon::parse("{$item->date_at->format('Y-m-d')} {$item->end_at}")->format('Y-m-d\\TH:i:sP'),
                'color' => $item->has_sign_off ? '#dc3545' : '#ADFF2F',
            ];
        }), 200);
    }

    /**
     * Create notes for specified resource from storage.
     *
     * @param  \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function notes(Request $request, User $user)
    {

        if ($request->filled('rag')) {
            $user->update($request->only('rag'));
        }

        if ($request->filled('message')) {
            $request->merge([
                'type' => 'notes',
            ]);

            $note = $user->notes()->create($request->input());

            return response()->json([
                'data' => $note->load('admin'),
                'message' => trans('coderstm::messages.users.note'),
            ], 200);
        } else {
            return response()->json([
                'data' => null,
                'message' => trans('coderstm::messages.users.note'),
            ], 200);
        }
    }

    /**
     * Change block of specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function changeBlock(Request $request, User $user)
    {
        $user->updateOrCreateBlocked([
            'disabled' => $user->has_blocked
        ]);

        return response()->json([
            'message' => trans_status('status', 'member', $user->has_blocked ? 'unblocked' : 'blocked'),
        ], 200);
    }

    public function markAsPaid(Request $request, User $user)
    {
        $request->validate([
            'payment_method' => 'required|exists:payment_methods,id',
        ]);

        try {
            $subscription = $user->subscription();
            $subscription->pay($request->payment_method);
        } catch (\Exception $e) {
            throw $e;
        }

        return response()->json([
            'data' => $user->fresh(),
            'message' => trans('coderstm::messages.subscription.due_payment')
        ], 200);
    }

    public function qrcode(User $user)
    {
        try {
            $qrcode = QrCode::size(512)
                ->format('png')
                ->mergeString(file_get_contents(public_path('/icons/favicon-128x128.png')))
                ->margin(1)
                ->generate($user->qrcode);

            // Save the image as a temporary file
            $tempFilePath = storage_path("app/{$user->id}.png");
            file_put_contents($tempFilePath, $qrcode);

            // Create a response with the image file
            return Response::download($tempFilePath, "{$user->id}.png", [
                'Content-Type' => 'image/png',
            ])->deleteFileAfterSend();
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function showByQrcode($qrcode)
    {
        try {
            $user = User::findByQrcode($qrcode);
            if ($user->subscribed()) {
                $user->accessColor = 'positive';
                $user->accessMessage = 'Access has been authorized!';
                $user->checkedIn();
                return response()->json($user, 200);
            } else {
                $user->noFeature = true;
                $user->accessColor = 'negative';
                $user->accessMessage = 'Access Denied: ' . trans('coderstm::messages.subscription.none');
                $user->accessDenied();
                return response()->json($user, 200);
            }
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => "required|exists:files,id"
        ]);

        $file = File::findOrFail($request->file);
        $path = $file->path(); // file path of csv

        $expectedHeaders = [
            "First Name" => true,
            "Surname" => true,
            "Gender" => true,
            "Email Address" => true,
            "Phone Number" => false,
            "Status" => true,
            "Deactivates At" => false,
            "Password" => true,
            "Created At" => true,
            "Plan" => true,
            "Trial Ends At" => true,
            "Address Line1" => true,
            "Address Line2" => false,
            "Country" => true,
            "State" => true,
            "State Code" => true,
            "City" => true,
            "Postcode/Zip" => false,
            "Note" => false,
        ];

        // Read CSV headers
        $csv = Reader::createFromPath($path, 'r');
        $csv->setHeaderOffset(0);
        $csv->setDelimiter(',');

        // Normalize CSV headers to remove newlines
        $csvHeaders = array_map('trim', $csv->getHeader());
        $mappedHeaders = User::getMappedAttributes();

        // Map $headers from $mapped
        $finalHeaders = [];
        foreach ($csvHeaders as $header) {
            if (isset($mappedHeaders[$header])) {
                $finalHeaders[] = $mappedHeaders[$header];
            } else {
                $finalHeaders[] = $header;
            }
        }

        // Validate unwanted fields
        $unwantedFields = array_diff($csvHeaders, array_keys($expectedHeaders));
        if (!empty($unwantedFields)) {
            throw ValidationException::withMessages([
                'unwanted' => ['Unwanted CSV headers: ' . implode(', ', $unwantedFields)],
            ]);
        }

        // Validate required headers
        $requiredHeaders = array_keys(array_filter($expectedHeaders));
        $missingHeaders = array_diff($requiredHeaders, $csvHeaders);
        if (!empty($missingHeaders)) {
            throw ValidationException::withMessages([
                'required' => ['Missing a required header: ' . implode(', ', $missingHeaders)],
            ]);
        }

        $rows = array_values([...$csv->getRecords($finalHeaders)]);

        $this->validate(new Request(['rows' => $rows]), [
            'rows.*.status' => Rule::in(['Pending', 'Active', 'Deactive']),
            'rows.*.email' => 'email',
            'rows.*.created_at' => 'date_format:Y-m-d H:i:s',
            'rows.*.deactivates_at' => 'date_format:Y-m-d H:i:s',
            'rows.*.trial_ends_at' => 'date_format:Y-m-d H:i:s',
            // 'rows.*.plan' => 'exists:plans,id',
        ]);

        $import = Import::create([
            'model' => User::class,
            'file_id' => $file->id,
            'options' => $request->input(),
        ]);

        dispatch(new ProcessCsvImport($import));

        // Return response indicating the import process has started
        return response()->json([
            'message' =>
            'This could take some time to complete. You can close this dialog box while we upload your file. We will email you once the import finishes.'
        ], 200);
    }
}

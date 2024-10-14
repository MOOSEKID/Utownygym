<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use League\Csv\Reader;
use Coderstm\Models\File;
use Coderstm\Models\Import;
use Coderstm\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Coderstm\Jobs\ProcessCsvImport;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Coderstm\Notifications\NewAdminNotification;
use Illuminate\Http\Resources\Json\ResourceCollection;

class AdminController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Admin::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, Admin $admin)
    {
        $admin = $admin->with('lastLogin', 'groups');

        if ($request->has('filter') && !empty($request->filter)) {
            $admin->where(DB::raw("CONCAT(first_name,' ',last_name)"), 'like', "%{$request->filter}%");
            $admin->orWhere('email', 'like', "%{$request->filter}%");
        }

        if ($request->has('group') && !empty($request->group)) {
            $admin->whereHas('groups', function ($query) use ($request) {
                $query->where('id', $request->group);
            });
        }

        if ($request->boolean('active')) {
            $admin->onlyActive();
        }

        if ($request->boolean('hideCurrent')) {
            $admin->excludeCurrent();
        }

        if ($request->boolean('deleted')) {
            $admin->onlyTrashed();
        }

        $admin = $admin->sortBy($request->sortBy ?? 'created_at', $request->direction ?? 'desc')
            ->paginate($request->rowsPerPage ?? 15);
        return new ResourceCollection($admin);
    }

    /**
     * Display a options listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function options(Request $request, Admin $admin)
    {
        $request->merge([
            'option' => true
        ]);
        return $this->index($request, $admin);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Admin $admin)
    {
        $rules = [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email|unique:admins',
            'password' => 'required|min:6|confirmed',
        ];

        $this->validate($request, $rules);

        $password = $request->filled('password') ? $request->password : fake()->regexify('/^IN@\d{3}[A-Z]{4}$/');

        $request->merge([
            'password' => bcrypt($password),
        ]);

        $admin = $admin->create($request->input());

        $admin->syncGroups(collect($request->groups));

        $admin->syncPermissions(collect($request->permissions));

        $admin->notify(new NewAdminNotification($admin, $password));

        return response()->json([
            'data' => $admin->load('groups', 'permissions'),
            'message' => trans('coderstm::messages.staff.store'),
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Admin $admin
     * @return \Illuminate\Http\Response
     */
    public function show(Admin $admin)
    {
        $admin = $admin->load([
            'permissions',
            'groups',
            'lastLogin',
        ]);
        return response()->json($this->toArray($admin), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Admin $admin
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Admin $admin)
    {
        // Set rules
        $rules = [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'email|unique:admins,email,' . $admin->id,
            'password' => 'min:6|confirmed',
        ];

        // Validate those rules
        $this->validate($request, $rules);

        if ($request->filled('password')) {
            $request->merge([
                'password' => bcrypt($request->password),
            ]);
        }

        if ($admin->id == user()->id) {
            $admin->update($request->except(['is_active', 'is_supper_admin']));
        } else {
            $admin->update($request->input());
        }

        $admin->syncGroups(collect($request->groups));

        $admin->syncPermissions(collect($request->permissions));

        return response()->json([
            'data' => $this->toArray($admin->load('groups', 'permissions')),
            'message' => trans('coderstm::messages.staff.updated'),
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Admin $admin
     * @return \Illuminate\Http\Response
     */
    public function destroy(Admin $admin)
    {
        $admin->delete();
        return response()->json([
            'message' => trans_choice('coderstm::messages.staff.destroy', 1),
        ], 200);
    }

    /**
     * Remove the selected resource from storage.
     *
     * @param  \App\Models\Admin $admin
     * @return \Illuminate\Http\Response
     */
    public function destroySelected(Request $request, Admin $admin)
    {
        $this->validate($request, [
            'items' => 'required',
        ]);
        $admin->whereIn('id', $request->items)->each(function ($item) {
            $item->delete();
        });
        return response()->json([
            'message' => trans_choice('coderstm::messages.staff.destroy', 2),
        ], 200);
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  \App\Models\Admin $admin
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        Admin::onlyTrashed()
            ->where('id', $id)->each(function ($item) {
                $item->restore();
            });
        return response()->json([
            'message' => trans_choice('coderstm::messages.staff.restored', 1),
        ], 200);
    }

    /**
     * Remove the selected resource from storage.
     *
     * @param  \App\Models\Admin $admin
     * @return \Illuminate\Http\Response
     */
    public function restoreSelected(Request $request, Admin $admin)
    {
        $this->validate($request, [
            'items' => 'required',
        ]);
        $admin->onlyTrashed()
            ->whereIn('id', $request->items)->each(function ($item) {
                $item->restore();
            });
        return response()->json([
            'message' => trans_choice('coderstm::messages.staff.restored', 2),
        ], 200);
    }

    /**
     * Display a listing of the permission.
     *
     * @return \Illuminate\Http\Response
     */
    public function modules(Request $request)
    {
        $modules = Module::with('permissions')->get()->map(function ($item) {
            $item->label = trans('coderstm::modules.' . $item->name);
            return $item;
        });

        return response()->json($modules, 200);
    }

    /**
     * Send reset password request to specified resource from storage.
     *
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Http\Response
     */
    public function resetPasswordRequest(Request $request, Admin $admin)
    {
        $status = Password::sendResetLink([
            'email' => $admin->email,
        ]);

        return response()->json([
            'status' => $status,
            'message' => trans('coderstm::messages.staff.password'),
        ], 200);
    }

    /**
     * Change admin of specified resource from storage.
     *
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Http\Response
     */
    public function changeAdmin(Request $request, Admin $admin)
    {
        if ($admin->id == user()->id) {
            return response()->json([
                'message' => trans('coderstm::messages.staff.admin_error'),
            ], 403);
        }

        $admin->update([
            'is_supper_admin' => !$admin->is_supper_admin
        ]);

        $type = $admin->is_supper_admin ? 'marked' : 'unmarked';

        return response()->json([
            'message' => trans('coderstm::messages.staff.admin_success', ['type' => trans('coderstm::messages.attributes.' . $type)]),
        ], 200);
    }

    /**
     * Change active of specified resource from storage.
     *
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Http\Response
     */
    public function changeActive(Request $request, Admin $admin)
    {
        if ($admin->id == user()->id) {
            return response()->json([
                'message' => trans('coderstm::messages.staff.reply'),
            ], 403);
        }

        $admin->update([
            'is_active' => !$admin->is_active
        ]);

        $type = !$admin->is_active ? 'active' : 'deactive';

        return response()->json([
            'message' => trans('coderstm::messages.staff.status', ['type' => trans('coderstm::messages.attributes.' . $type)]),
        ], 200);
    }

    public function changeInstructor(Request $request, Admin $admin)
    {
        $admin->update([
            'is_instructor' => !$admin->is_instructor
        ]);

        return response()->json([
            'message' => trans('messages.staff_instructor', ['type' => $admin->is_instructor ? 'marked' : 'unmarked']),
        ], 200);
    }

    private function toArray(Admin $admin)
    {
        $data = $admin->toArray();

        $data['permissions'] = $admin->permissions->map(function ($permission) {
            return [
                'id' => $permission->id,
                'access' => $permission->pivot->access,
            ];
        });

        $data['groupPermissions'] = $admin->getPermissionsViaGroups()->map(function ($permission) {
            return [
                'id' => $permission->id,
                'access' => $permission->pivot->access,
            ];
        });

        return $data;
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
            "Status" => false,
            "Email Address" => true,
            "Phone Number" => false,
            "Password" => true,
            "Created At" => true,
            "Address Line1" => true,
            "Address Line2" => false,
            "Country" => true,
            "State" => true,
            "State Code" => true,
            "City" => true,
            "Postcode/Zip" => false,
            "Is Instructor" => false,
        ];

        // Read CSV headers
        $csv = Reader::createFromPath($path, 'r');
        $csv->setHeaderOffset(0);
        $csv->setDelimiter(',');

        // Normalize CSV headers to remove newlines
        $csvHeaders = array_map('trim', $csv->getHeader());
        $mappedHeaders = Admin::getMappedAttributes();

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
        ]);

        $import = Import::create([
            'model' => Admin::class,
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

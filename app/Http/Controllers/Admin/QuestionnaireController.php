<?php

namespace App\Http\Controllers\Admin;

use App\Models\Questionnaire;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Resources\Json\ResourceCollection;

class QuestionnaireController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Questionnaire $questionnaire)
    {
        $questionnaire = $questionnaire->query();

        if ($request->filled('filter')) {
            $questionnaire->where('name', 'like', "%{$request->filter}%");
        }

        if ($request->boolean('active')) {
            $questionnaire->onlyActive();
        }

        if ($request->boolean('deleted')) {
            $questionnaire->onlyTrashed();
        }

        $questionnaire = $questionnaire->orderBy($request->sortBy ?? 'created_at', $request->direction ?? 'desc')
            ->paginate($request->rowsPerPage ?? 15);
        return new ResourceCollection($questionnaire);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Questionnaire $questionnaire)
    {
        $rules = [
            'name' => 'required',
            'fields' => 'required|array',
        ];

        // Validate those rules
        $this->validate($request, $rules);

        // create the questionnaire
        $questionnaire = Questionnaire::create($request->input());

        return response()->json([
            'data' => $questionnaire,
            'message' => trans_module('store', 'questionnaire'),
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Questionnaire $questionnaire)
    {
        return response()->json($questionnaire, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Questionnaire $questionnaire)
    {
        $rules = [
            'name' => 'required',
            'fields' => 'required|array',
        ];

        // Validate those rules
        $this->validate($request, $rules);

        // update the questionnaire
        $questionnaire->update($request->input());

        return response()->json([
            'data' => $questionnaire,
            'message' => trans_module('updated', 'questionnaire'),
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Questionnaire $questionnaire)
    {
        $questionnaire->delete();
        return response()->json([
            'message' => trans_module('destroy', 'questionnaire'),
        ], 200);
    }

    /**
     * Change active of specified resource from storage.
     */
    public function changeActive(Request $request, Questionnaire $questionnaire)
    {
        $questionnaire->update([
            'active' => !$questionnaire->active
        ]);

        return response()->json([
            'message' => trans_status('status', 'questionnaire', $questionnaire->active ? 'active' : 'deactive'),
        ], 200);
    }

    /**
     * Make duplicate of specified resource from storage.
     */
    public function duplicate(Request $request, Questionnaire $questionnaire)
    {
        $questionnaire = $questionnaire->duplicate();

        return response()->json([
            'data' => $questionnaire,
            'message' => trans_modules('duplicated', 'questionnaire'),
        ], 200);
    }

    public function markAsDefault(Request $request, Questionnaire $questionnaire)
    {
        $questionnaire->markAsDefault();

        return response()->json([
            'data' => $questionnaire,
            'message' => 'Questionnaire marked as default successfully!',
        ], 200);
    }

    public function default(Request $request)
    {
        $questionnaire = Questionnaire::where('default', 1)->first();
        return response()->json($questionnaire, 200);
    }
}

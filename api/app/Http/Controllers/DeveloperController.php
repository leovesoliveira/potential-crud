<?php

namespace App\Http\Controllers;

use App\Developer;
use App\Http\Requests\DeveloperStoreRequest;
use App\Http\Requests\DeveloperUpdateRequest;
use App\Http\Resources\Developer as DeveloperResource;
use App\Http\Resources\DeveloperCollection;
use Illuminate\Http\Request;

class DeveloperController extends Controller
{
    public function index(Request $request)
    {
        $developers = Developer::query()
            ->filter($request->query())
            ->latest()
            ->paginate(9);

        return new DeveloperCollection($developers);
    }

    public function store(DeveloperStoreRequest $request)
    {
        $developer = Developer::create($request->validated());

        return new DeveloperResource($developer);
    }

    public function show(Request $request, Developer $developer)
    {
        return new DeveloperResource($developer);
    }

    public function update(DeveloperUpdateRequest $request, Developer $developer)
    {
        $developer->update($request->validated());

        return new DeveloperResource($developer);
    }

    public function destroy(Request $request, Developer $developer)
    {
        $developer->delete();

        return response()->noContent();
    }
}

<?php

namespace Tests\Feature\Http\Controllers;

use App\Developer;
use App\Http\Resources\DeveloperCollection;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\DeveloperController
 */
class DeveloperControllerTest extends TestCase
{
    use AdditionalAssertions, RefreshDatabase, WithFaker;

    /**
     * @test
     */
    public function index_behaves_as_expected()
    {
        $developers = factory(Developer::class, 3)->create();

        $response = $this->get(route('developers.index'));

        $response->assertOk();
        $response->assertJsonStructure([]);
    }

    /**
     * @test
     */
    public function store_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\DeveloperController::class,
            'store',
            \App\Http\Requests\DeveloperStoreRequest::class
        );
    }

    /**
     * @test
     */
    public function store_saves()
    {
        $response = $this->post(route('developers.store'), [
            'name' => 'John Duo',
            'gender' => 'm',
            'hobby' => 'soccer',
            'birthdate' => '1994-12-12',
        ]);

        $response->assertCreated();
        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'gender',
                'hobby',
                'birthdate',
                'age',
            ]
        ]);

        $this->assertDatabaseHas('developers', [
            'name' => 'John Duo',
            'gender' => 'm',
            'hobby' => 'soccer',
            'birthdate' => '1994-12-12',
        ]);
    }

    /**
     * @test
     */
    public function show_behaves_as_expected()
    {
        $developer = factory(Developer::class)->create();

        $response = $this->get(route('developers.show', $developer));

        $response->assertOk();
        $response->assertJsonStructure([]);
    }

    /**
     * @test
     */
    public function update_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\DeveloperController::class,
            'update',
            \App\Http\Requests\DeveloperUpdateRequest::class
        );
    }

    /**
     * @test
     */
    public function update_behaves_as_expected()
    {
        $developer = factory(Developer::class)->create();

        $response = $this->put(route('developers.update', $developer));

        $developer->refresh();

        $response->assertOk();
        $response->assertJsonStructure([]);
    }

    /**
     * @test
     */
    public function destroy_deletes_and_responds_with()
    {
        $developer = factory(Developer::class)->create();

        $response = $this->delete(route('developers.destroy', $developer));

        $response->assertNoContent();

        $this->assertDeleted($developer);
    }
}

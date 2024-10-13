@extends('layouts.error', [
    'title' => __('Unauthorized'),
    'code' => '401',
])
@section('message')
    <section class="ct-row clearfix">
        <div class="container">
            <div class="row">
                <div class="col-lg-7 mx-auto">
                    <div class="section-title">
                        <div class="title-header text-center">
                            <h1 style="font-size: 120px; line-height: 1" class="error-code margin_bottom0 text-primary">
                                401
                            </h1>
                            <h2 class="title margin_bottom0">Unauthorized</h2>
                            <p>
                                Sorry, you don't have permission to access this resource. Please log in or check your
                                credentials.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection

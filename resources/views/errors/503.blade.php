@extends('layouts.error', [
    'title' => __('Service Unavailable'),
    'code' => '503',
])
@section('message')
    <section class="ct-row clearfix">
        <div class="container">
            <div class="row">
                <div class="col-lg-7 mx-auto">
                    <div class="section-title">
                        <div class="title-header text-center">
                            <h1 style="font-size: 120px; line-height: 1" class="error-code margin_bottom0 text-primary">
                                503
                            </h1>
                            <h2 class="title margin_bottom0">Service Unavailable</h2>
                            <p>
                                Our service is temporarily unavailable. We apologize for the inconvenience. Please try again
                                later.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection

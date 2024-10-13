@extends('layouts.error', [
    'title' => __('Too Many Requests'),
    'code' => '429',
])
@section('message')
    <section class="ct-row clearfix">
        <div class="container">
            <div class="row">
                <div class="col-lg-7 mx-auto">
                    <div class="section-title">
                        <div class="title-header text-center">
                            <h1 style="font-size: 120px; line-height: 1" class="error-code margin_bottom0 text-primary">
                                429
                            </h1>
                            <h2 class="title margin_bottom0">Too Many Requests</h2>
                            <p>
                                Slow down! You've exceeded the rate limit. Please wait a moment before making additional
                                requests.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection

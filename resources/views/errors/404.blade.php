@extends('layouts.error', [
    'title' => __('Not Found'),
    'code' => '404',
])
@section('message')
    <section class="ct-row clearfix">
        <div class="container">
            <div class="row">
                <div class="col-lg-7 mx-auto">
                    <div class="section-title">
                        <div class="title-header text-center">
                            <h1 style="font-size: 120px; line-height: 1" class="error-code margin_bottom0 text-primary">
                                404
                            </h1>
                            <h2 class="title margin_bottom0">Page not found</h2>
                            <p>
                                Sorry, we couldn't find the page you're looking for.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection

@extends('layouts.error', [
    'title' => __('Page Expired'),
    'code' => '419',
])
@section('message')
    <section class="ct-row clearfix">
        <div class="container">
            <div class="row">
                <div class="col-lg-7 mx-auto">
                    <div class="section-title">
                        <div class="title-header text-center">
                            <h1 style="font-size: 120px; line-height: 1" class="error-code margin_bottom0 text-primary">
                                419
                            </h1>
                            <h2 class="title margin_bottom0">Page Expired</h2>
                            <p>
                                Your session has expired. Please log in again to continue accessing this resource.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection

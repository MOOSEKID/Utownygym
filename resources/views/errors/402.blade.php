@extends('layouts.error', [
    'title' => __('Payment Required'),
    'code' => '402',
])
@section('message')
    <section class="ct-row clearfix">
        <div class="container">
            <div class="row">
                <div class="col-lg-7 mx-auto">
                    <div class="section-title">
                        <div class="title-header text-center">
                            <h1 style="font-size: 120px; line-height: 1" class="error-code margin_bottom0 text-primary">
                                402
                            </h1>
                            <h2 class="title margin_bottom0">Payment Required</h2>
                            <p>
                                Oops, this service requires payment. Please make sure your account is in good standing or
                                contact support.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection

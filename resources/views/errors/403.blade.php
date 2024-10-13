@extends('layouts.error', [
    'title' => __('Forbidden'),
    'code' => '403',
])
@section('message')
    <section class="ct-row clearfix">
        <div class="container">
            <div class="row">
                <div class="col-lg-7 mx-auto">
                    <div class="section-title">
                        <div class="title-header text-center">
                            <h1 style="font-size: 120px; line-height: 1" class="error-code margin_bottom0 text-primary">
                                403
                            </h1>
                            <h2 class="title margin_bottom0">Forbidden</h2>
                            <p>
                                {{ __($exception->getMessage() ?: 'Access to this resource is forbidden. Make sure you have the necessary permissions or contact the administrator.') }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection

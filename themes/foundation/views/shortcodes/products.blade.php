<div class="row product">
    @foreach ($product as $item)
        <div class="col-md-12 col-sm-12">
            <div class="featured-icon-box blog icon-align-before-content icon-align-top">
                <div class="featured-icon">
                    <div
                        class="ttm-icon ttm-icon_element-onlytxt ttm-icon_element-color-skincolor ttm-icon_element-size-sm">
                        @if ($item->is_closed)
                            <i class="fa fa-calendar-times-o"></i>
                        @else
                            <i class="fa fa-calendar-check-o"></i>
                        @endif
                    </div>
                </div>
                <div class="featured-content">
                    <div class="featured-title">
                        <h5 class="m-0">
                            {{ $item->date->format('d/m/Y') }}
                            @if ($item->is_closed)
                                (Closed)
                            @else
                                <i class="fa fa-clock-o"></i>
                                {{ $item->open_at_formated }} - {{ $item->close_at_formated }}
                            @endif
                        </h5>
                    </div>
                    <div class="featured-desc">
                        <p class="title">
                            {{ $item->note }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    @endforeach

    <div class="col-lg-12">
        {{ $product->links() }}
    </div>

    @if (!$product->count())
        <div class="col-lg-12">
            <div class="featured-content">
                <div class="featured-title">
                    <h5 class="m-0">Empty</h5>
                    <p class="title">
                        No product to display at this time. Please check back later for
                        any updates.
                    </p>
                </div>
            </div>
        </div>
    @endif
</div>

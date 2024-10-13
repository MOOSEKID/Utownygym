<?php

namespace App\Shortcodes;

use Coderstm\Models\Shop\Product;
use Vedmant\LaravelShortcodes\Shortcode;

class Products extends Shortcode
{
    public $attributes = [
        'class' => ['default' => 'products'],
        'layout' => ['default' => 'default'],
    ];

    public function render($content)
    {
        $atts = $this->atts();
        $products = Product::onlyActive()->paginate(10);

        return $this->view('shortcodes.products', array_merge($atts, [
            'content' => $content,
            'products' => $products
        ]));
    }
}

<?php

namespace Database\Seeders;

use App\Models\User;
use Coderstm\Models\Shop\Order;
use Coderstm\Services\Resource;
use Coderstm\Models\Shop\Product;
use Illuminate\Database\Seeder;
use Coderstm\Models\Shop\Product\Variant;

class OrderSeeder extends Seeder
{
    /**
     * Seed the application's database for shop.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->count(5)->create()->each(function ($customer) {
            $customer = $customer->fresh('address');
            Order::factory()->count(2)->create([
                'customer_id' => $customer->id,
                'billing_address' => array_merge($customer->address->toArray(), $customer->only([
                    'first_name',
                    'last_name',
                    'phone_number'
                ])),
            ])->each(function ($order) use ($customer) {
                $product = Product::has('variants')->inRandomOrder()->first();
                if ($product) {
                    $variant = $product->variants()->inRandomOrder()->first() ?? new Variant();
                    $order->saveRelated(new Resource([
                        'contact' => $customer->only('email', 'phone_number'),
                        'collect_tax' => $order->collect_tax,
                        'line_items' => [
                            [
                                "product_id" => $product->id,
                                "variant_id" => $variant->id,
                                "title" => $product->title,
                                "variant_title" => $variant->title,
                                "price" => rand(230, 300),
                                "quantity" => rand(1, 5),
                                "taxable" => true,
                            ],
                            [
                                "title" => "Accusantium animi repudiandae velit ut.",
                                "variant_title" => "Green / M",
                                "is_custom" => true,
                                "price" => rand(230, 300),
                                "quantity" => rand(1, 5),
                                "taxable" => true,
                            ],
                        ],
                        'billing_address' => $order->billing_address
                    ]));
                }
            });
        });
    }
}

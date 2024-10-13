<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    // use WithoutModelEvents;

    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            FeatureSeeder::class,
            ModuleSeeder::class,
            SettingsSeeder::class,
            GroupSeeder::class,
            NotificationSeeder::class,
            PaymentMethodSeeder::class,
            PlanSeeder::class,
            TaxSeeder::class,
            AdminSeeder::class,
            UserSeeder::class,
            ClassListSeeder::class,
            InstructorSeeder::class,
            LocationSeeder::class,
            TemplateSeeder::class,
            ClassScheduleSeeder::class,
            TemplateScheduleSeeder::class,
            EnquirySeeder::class,
            TaskSeeder::class,
            AnnouncementSeeder::class,
            ShopSeeder::class,
            OrderSeeder::class,
            PageSeeder::class,
        ]);
    }
}

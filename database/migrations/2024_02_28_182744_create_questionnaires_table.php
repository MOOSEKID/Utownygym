<?php

use Illuminate\Support\Str;
use Coderstm\Traits\Helpers;
use App\Models\Questionnaire;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    use Helpers;

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('questionnaires', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->boolean('has_pdf')->nullable()->default(false);
            $table->boolean('has_signature')->nullable()->default(false);
            $table->boolean('send_email')->nullable()->default(false);
            $table->boolean('default')->nullable()->default(false);
            $table->boolean('active')->nullable()->default(false);
            $table->{$this->jsonable()}('fields')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('submissions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('questionnaire_id')->nullable();
            $table->{$this->jsonable()}('answers')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->foreign('questionnaire_id')->references('id')->on('questionnaires')->cascadeOnDelete();
        });

        Questionnaire::updateOrCreate([
            'name' => 'Default Questionnaire'
        ], [
            'fields' => [
                [
                    'label' => "General information",
                    'type' => 'label',
                    'key' => Str::uuid(),
                    'config' => ['width' =>  12]
                ],
                [
                    'label' => 'Name',
                    'key' => Str::uuid(),
                    'type' => 'input',
                    'config' => [
                        'width' =>  12,
                        'required' => true,
                        'hideLabel' =>  false,
                        'placeholder' => 'Name',
                    ]
                ],
                [
                    'label' => 'Email',
                    'key' => Str::uuid(),
                    'type' => 'email',
                    'config' => [
                        'width' =>  12,
                        'required' => true,
                        'hideLabel' =>  false,
                        'placeholder' => 'Email',
                    ]
                ],
                [
                    'label' => "Emergency Contact Number",
                    'key' => Str::uuid(),
                    'type' => 'label',
                    'config' => ['width' =>  12]
                ],
                [
                    'label' => 'Name',
                    'key' => Str::uuid(),
                    'type' => 'input',
                    'config' => [
                        'width' =>  6,
                        'required' => true,
                        'hideLabel' =>  true,
                        'placeholder' => 'Name',
                    ]
                ],
                [
                    'label' => 'Contact Number',
                    'key' => Str::uuid(),
                    'type' => 'input',
                    'config' => [
                        'width' =>  6,
                        'required' => true,
                        'hideLabel' =>  true,
                        'placeholder' => 'Contact Number',
                    ]
                ],
                [
                    'label' => 'Allergies/Other Special Health Considerations',
                    'key' => Str::uuid(),
                    'type' => 'textarea',
                    'config' => [
                        'width' =>  12,
                        'required' => true,
                        'hideLabel' =>  true,
                        'placeholder' => 'Allergies/Other Special Health Considerations',
                    ]
                ],
                [
                    'label' => "Medical questions",
                    'key' => Str::uuid(),
                    'type' => 'checkbox',
                    'options' => [
                        ['label' => 'Do you know of any reason you should not exercise or increase your physical activity', 'value' => 'reason_not_exercise'],
                        ['label' => "Are you recovering from an illness, injury or operation", 'value' => 'recovering'],
                        ['label' => "Are you pregnant", 'value' => 'pregnant'],
                        ['label' => "Not used to being physically active", 'value' => 'not_active'],
                        ['label' => "Do you suffer from Asthma", 'value' => 'asthma'],
                        ['label' => "Has a Doctor said that you have a heart condition and you should only do physical activity recommended by a Doctor", 'value' => 'doctor_heart'],
                        ['label' => "When you perform physical activity, do you feel a pain in your chest", 'value' => 'pain_chest'],
                        ['label' => "When not performing physical activity, have you recently suffered chest pain", 'value' => 'recent_chest_pain'],
                        ['label' => "Do you have bone or joint problems that may be made worse with physical activity", 'value' => 'bone_joint_problems'],
                        ['label' => "Are you currently on any medication for blood pressure or a heart condition", 'value' => 'medication_blood_heart'],
                        ['label' => "I am aware of other reasons why I should not take part in physical activity in a fitness centre environment", 'value' => 'other_reasons']
                    ],
                    'config' => [
                        'width' =>  12,
                        'required' => false,
                        'skip' => true,
                        'hideLabel' =>  false,
                        'value' => [],
                    ],
                ],
                [
                    'label' => "Disclaimers",
                    'key' => Str::uuid(),
                    'type' => 'checkbox',
                    'options' => [
                        ['label' => 'I accept the statements below by ticking the checkbox next to each statement.', 'value' => 'accept_statements'],
                        ['label' => "I confirm that my responses are accurate", 'value' => 'confirm_responses'],
                        ['label' => "If I have highlighted any health concerns detailed above I understand that I am required to discuss my exercise programme within a gym environment with my Doctor or Health Professional and to take advice on activities which are safe to participate in.", 'value' => 'exercise_programme'],
                        ['label' =>  "In the event that I have been advised to seek medical clearance prior to undertaking exercise, I agree to contact my doctor and take responsibility for obtaining written permission prior to the commencement of my exercise programme in a gym environment.", 'value' => 'seek_medical'],
                        ['label' => "Should any change in my Health or unusual symptoms occur at any point, I will cease participation and inform a Doctor of these symptoms.", 'value' => 'unusual_symptoms'],
                        ['label' => "I understand that I must notify you immediately of any changes in my health.", 'value' => 'notify_immediately'],
                        ['label' => "Assumption of Risk: I hereby state that I have read, understood and answered honestly the questions above. I also state that I wish to participate in activities, which may include aerobic exercise, resistance exercise and stretching. I realise that my participation in these activities involves the risk of injury and even the possibility of death. Furthermore, I hereby confirm that I am voluntarily engaging in an acceptable level of exercise, which has been recommended to me", 'value' => 'assumption_of_risk'],
                        ['label' => "We assume no liability for persons who undertake physical activity. Should you be in any doubt after completing this questionnaire you agree to consult your doctor prior to undertaking physical activity.", 'value' => 'assume_liability']
                    ],
                    'config' => [
                        'width' =>  12,
                        'required' => true,
                        'hideLabel' =>  false,
                        'value' => [],
                    ]
                ],
            ],
            'default' => true,
            'active' => true,
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('submissions');
        Schema::dropIfExists('questionnaires');
    }
};

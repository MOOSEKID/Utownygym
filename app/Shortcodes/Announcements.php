<?php

namespace App\Shortcodes;

use App\Models\Announcement;
use Vedmant\LaravelShortcodes\Shortcode;

class Announcements extends Shortcode
{
    public $attributes = [
        'class' => ['default' => 'announcements'],
        'layout' => ['default' => 'default'],
    ];

    public function render($content)
    {
        $atts = $this->atts();
        $announcements = Announcement::active()->paginate(10);

        return $this->view('shortcodes.announcements', array_merge($atts, [
            'content' => $content,
            'announcements' => $announcements
        ]));
    }
}

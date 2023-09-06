<?php

namespace App\Enums;

/**
 * This class holds a list of allowed values for topic subscriptions;
 */

class Topics
{
    const VALUE1 = 'projects';
    const VALUE2 = 'data';
    const VALUE3 = 'elearning';
    const VALUE4 = 'events';
    const VALUE5 = 'jobs';
    const VALUE6 = 'grants';
    const VALUE7 = 'suppliers';
    const VALUE8 = 'resources';

    public static function getValues()
    {
        return [
            self::VALUE1,
            self::VALUE2,
            self::VALUE3,
            self::VALUE4,
            self::VALUE5,
            self::VALUE6,
            self::VALUE7,
            self::VALUE8
        ];
    }
}
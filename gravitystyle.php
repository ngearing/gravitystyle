<?php

/**
 * Plugin Name: Gravity Style
 * Description: A plugin to enhance the styling of Gravity Forms.
 * Version: 1.0.0
 * 
 * Requires Plugins: gravityforms
 */

// Exit if accessed directly.
if (! defined('ABSPATH')) {
    exit;
}

/**
 * Enqueue styles for Gravity Forms.
 */
function gravitystyle_enqueue_styles() {
    // Check if Gravity Forms is active.
    if (class_exists('GFForms')) {
        // Enqueue the custom stylesheet.
        wp_enqueue_style('gravitystyle-styles', plugin_dir_url(__FILE__) . 'css/gravitystyle.css', array(), '1.0.0');

        wp_enqueue_script('gravitystyle-scripts', plugin_dir_url(__FILE__) . 'js/gravitystyle.js', [], '1.0.0', true);
    }
}
add_action('wp_footer', 'gravitystyle_enqueue_styles');

/**
 * Add class to Gravity Forms wrapper element.
 */
function gravitystyle_add_wrapper_class($classes, $form) {
    // Add a custom class to the form wrapper.
    $classes[] = 'gravitystyle-form';
    return $classes;
}
add_filter('gform_wrapper_classes', 'gravitystyle_add_wrapper_class', 10, 2);

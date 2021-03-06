<?php

function enqueue_things() {
	$styles_bundle = get_stylesheet_directory_uri().'/build/css/styles.css';
    $scripts_bundle = get_stylesheet_directory_uri().'/build/js/bundle.js';
    wp_enqueue_style('styles', $styles_bundle, array(), md5_file($styles_bundle), false);            
	wp_enqueue_script('scripts', $scripts_bundle, array(), md5_file($scripts_bundle), true);
}
if ( ! is_admin() ) {
	add_action( 'wp_enqueue_scripts', 'enqueue_things' );
}
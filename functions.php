<?php

function enqueue_things() {
	$styles_bundle = '/build/estheme-bundle.css';
    $scripts_bundle = '/build/estheme-bundle.js';
    wp_enqueue_style('styles', get_stylesheet_directory_uri().$styles_bundle, [], md5_file(get_stylesheet_directory().$styles_bundle), false);            
	wp_enqueue_script('scripts', get_stylesheet_directory_uri().$scripts_bundle, [], md5_file(get_stylesheet_directory().$scripts_bundle), true);
}
if ( ! is_admin() ) {
	add_action( 'wp_enqueue_scripts', 'enqueue_things' );
}
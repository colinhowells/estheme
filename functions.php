<?php

function enqueue_things() {
	$styles = '/build/styles.css';
    $scripts = '/build/bundle.mjs';
	$legacy = '/build/legacy.js';
    wp_enqueue_style('styles', get_stylesheet_directory_uri().$styles, [], md5_file(get_stylesheet_directory().$styles), false);            
	wp_enqueue_script('bundle', get_stylesheet_directory_uri().$scripts, [], md5_file(get_stylesheet_directory().$scripts));
	wp_enqueue_script('bundle-legacy', get_stylesheet_directory_uri().$legacy, [], md5_file(get_stylesheet_directory().$legacy), true);
}

if ( ! is_admin() ) {
	add_action( 'wp_enqueue_scripts', 'enqueue_things' );
}



function add_type_attribute($tag, $handle, $src) {
    if ( 'bundle' === $handle ) {
        $tag = '<script type="module" src="' . esc_url( $src ) . '"></script>';
    }
    if ( 'legacy' === $handle ) {
        $tag = '<script nomodule src="' . esc_url( $src ) . '"></script>';
    }
    return $tag;
}

add_filter('script_loader_tag', 'add_type_attribute' , 10, 3);
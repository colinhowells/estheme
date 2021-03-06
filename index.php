<?php
get_header();
?>

        <div id="interior">
            <div>
                <div id="content">

                    <header id="grid-header">

                        <?php
                        get_search_form();
                        // true for categories, authors, CPT, date
                        if ( is_archive() ) :
                            the_archive_title( '<h1>', '</h1>' );
                            the_archive_description();
                        else :
                            if ( ! have_posts() ) : 
                                echo '<h1>We couldn’t find anything for “'.get_search_query().'”</h1>';
                            endif;    
                        endif;
                        ?>

                    </header>

                    <?php if ( have_posts() ) : ?>

                        <nav id="grid" role="navigation" aria-label="<?php echo get_search_query() ? 'Search Results: '.get_search_query() :  wp_strip_all_tags(get_the_archive_title()); ?>">

                            <?php
                            while ( have_posts() ) :
                                the_post();
                                require('partials/card.php');
                            endwhile;
                            ?>

                        </nav>

                    <?php 
                    else :
                        // empty container for React to render recommended posts into:
                        echo '<nav id="recommended" role="navigation" aria-label="Recommended Articles"></nav>';
                    endif;
                    ?>

                    <nav id="pagination" role="navigation" aria-label="Pagination">
                        
                        <?php 
                        posts_nav_link(' ', '&larr; Back', 'More &rarr;'); 
                        ?>

                    </nav>

                </div>
            </div>
        </div>

<?php 
get_footer(); 
?>
<?php
/**
 * The template for displaying all single posts.
 *
 * @package storefront
 */

get_header(); ?>

	<?php echo do_shortcode('[wp-post-pdf]'); ?>
<div style="margin-bottom: 50px;"></div>
<?php
do_action( 'storefront_sidebar' );
get_footer();

<?php
/**
 * The Header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 * @package vantage
 * @since vantage 1.0
 * @license GPL 2.0
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta http-equiv="X-UA-Compatible" content="IE=10" />
	<title><?php wp_title( '|', true, 'right' ); ?></title>
	<link rel="profile" href="http://gmpg.org/xfn/11" />
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<?php do_action('vantage_before_page_wrapper') ?>

<div id="page-wrapper">

	<?php do_action( 'vantage_before_masthead' ); ?>

	<?php get_template_part( 'parts/masthead', apply_filters( 'vantage_masthead_type', siteorigin_setting( 'layout_masthead' ) ) ); ?>

	<?php do_action( 'vantage_after_masthead' ); ?>

	<?php vantage_render_slider() ?>

	<?php do_action( 'vantage_before_main_container' ); ?>
<?php
if  (is_front_page()) {   
?>

<script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>
    <script src="DeliveryCalculatorClass.js" type="text/javascript"></script>
    <script src="deliveryCalculator.js" type="text/javascript"></script>
    <style>
#deliverycalc {
display:flex;
padding-bottom: 5px;
background-color:#4654a4;
}
        #map {
            width: 100%;
            height: 350px;
            padding: 0;
            margin: 0;

        }
        #calcinfo {
            width: 350px;
            height: 350px;
            padding: 10px;
margin: 0;
float:right;
background-color:#fff
        }
    </style>
<div id="deliverycalc">
    <div id="map"></div>
<div id="calcinfo"><i class="fa-calculator fa"></i><span class="fontawesome-text"> Калькулятор доставки</span></div>
</div>
<?php
}
?>


	<div id="main" class="site-main">
		<div class="full-container">
			<?php do_action( 'vantage_main_top' ); ?>
/**
 * imagecover.js
 * Author & copyright (c) 2014: Pieter Beemsterboer
 * imade.nl
 * https://twitter.com/___pieter
 *
 * Dual MIT & GPL license
 *
 * This jQuery plugin can be used to mimic the background-size:cover; for img elements
 * to cover their parent container.
 *
 * This plugin is based on imagefill.js by John Polacek but is a complete rewrite.
 * (http://johnpolacek.github.io/imagefill.js)
 *
 * EXAMPLE
 * <div class="container"><img src="myawesomeimage" /></div>
 * $('.container').imageCover(); // stretches image to cover container
 *
 * REQUIRES:
 * imagesLoaded - https://github.com/desandro/imagesloaded
 *
 */
;(function($){

	$.fn.imageCover = function(options) {

		var containers = this;

		var defaults = {
			windowMinWidth: false,
			windowMaxWidth: false,
			vAlign: 0.5, // 0 = top, 0.5 = middle, 1 = bottom
			hAlign: 0.5, // 0 = left, 0.5 = center, 1 = right
			interval: 0 //
		};

		var settings = $.extend({}, defaults, options);

		var intervalId;

		hideImages(containers);

		$(window).on('resize', function(){
			coverImages(containers, settings);
		});

		containers.imagesLoaded().done( function(instance) {
			showImages(containers);
			coverImages(containers, settings);

			if(settings.interval)
			{
				intervalId = setInterval(function(){
					coverImages(containers, settings);
				}, settings.interval);
			}
		});

		return this;
	};


	function coverImages(containers, settings)
	{
		if( isActive(settings) )
		{
			resizeImages(containers, settings);
		}
		else
		{
			resetImages(containers);
		}
	};


	function resizeImages(containers, settings)
	{
		containers.each(function(){

			var container = $(this);
			var containerWidth = container.outerWidth(false);
			var containerHeight = container.outerHeight(false);
			var containerAspect = containerWidth/containerHeight;
			var containerStyle = {
				'overflow': 'hidden',
				'position': (container.css('position') == 'absolute') ? 'absolute' : 'relative'
			};

			var img = container.find('img');
			var imgHeight = img.height();
			var imgWidth = img.width();
			var imgAspect = imgWidth/imgHeight;
			var imgStyle = {
				'position':'absolute',
				'max-width':'none',
				'width': 'auto',
				'height': 'auto',
				'top': '0px',
				'left': '0px'
			};

			// img is taller than container
			if(imgAspect < containerAspect)
			{
				imgStyle.width = containerWidth;
				imgStyle.top = -(containerWidth / imgAspect - containerHeight) * settings.vAlign + 'px';
			}

			// img is wider than container
			else
			{
				imgStyle.height = containerHeight;
				imgStyle.left = -(containerHeight * imgAspect - containerWidth) * settings.hAlign + 'px';
			}

			container.css(containerStyle);
			img.css(imgStyle);
		});
	};


	function resetImages(containers)
	{
		containers.removeAttr('style').find('img').removeAttr('style');
	};


	function hideImages(containers)
	{
		containers.hide();
	};


	function showImages(containers)
	{
		containers.fadeIn(800);
	};


	function isActive(settings)
	{
		// var windowWidth =  $(window).width();
		var windowWidth = typeof innerWidth === 'undefined' ? document.body.clientWidth : innerWidth;

		if(settings.windowMinWidth == false && settings.windowMaxWidth == false) return true;
		if(settings.windowMinWidth == false && windowWidth <= settings.windowMaxWidth) return true;
		if(windowWidth >= settings.windowMinWidth && settings.windowMaxWidth == false) return true;
		if(windowWidth >= settings.windowMinWidth && windowWidth <= settings.windowMaxWidth) return true;

		return false;
	};

}(jQuery));
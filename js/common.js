$('.hamburger-btn').on('click', function() {
	$('.nav-col_content, .nav-inner').toggleClass('active');
});


$(window).scroll(function() {    
    var scroll = $(window).scrollTop();

    if (scroll >= 50) {
        $(".hamburger").addClass("to-down");
    } else {
        $(".hamburger").removeClass("to-down");
    }
});

$('.nav-link').click(function(event){
    $('html, body').animate({
      scrollTop: $( $.attr(this, 'href') ).offset().top -50
    }, 500);
    event.preventDefault();
  });



var swiper = new Swiper('.staff-slider', {
	slidesPerView: 3,
	spaceBetween: 30,
	freeMode: false,
	breakpoints: {
		1024: {
			slidesPerView: 3,
			spaceBetween: 40,
		},
		840: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
		640: {
			slidesPerView: 1,
			spaceBetween: 20,
		}
	}
});


$(function(){
   $.fn.equivalent = function (){

      var $blocks = $(this),

      maxH = $blocks.eq(0).height(); 
      $blocks.each(function(){

         if ( $(this).height() > maxH ) {
            maxH = $(this).height();
        }

    });

      $blocks.height(maxH); 
  }
  $('.news-item').equivalent();
  $('.news-title').equivalent();
  $('.news-descr').equivalent();  
});



// map ------------------
    $("#map-canvas").gmap3({
        action: "init",
        marker: {
			// markers and locations------------------
            values: [ {
                latLng: [ 33.755743, -118.212062 ],
                data: "Our office",
                options: {
                    icon: "pic/pin-1.png"
                }
            } ],
            options: {
                draggable: false
            },
        },
        map: {
            options: {
                zoom: 11,
                zoomControl: true,
                mapTypeControl: true,
                scaleControl: true,
                scrollwheel: false,
                streetViewControl: true,
                draggable: true,
                styles: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
            }
        }
    });
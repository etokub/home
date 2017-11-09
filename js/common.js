$('.hamburger-btn').on('click', function() {
	$('.nav-inner').toggleClass('active');
});

var swiper = new Swiper('.staff-slider', {
	slidesPerView: 3,
	spaceBetween: 30,
	freeMode: false
});
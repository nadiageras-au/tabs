$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        items: 1,
        loop: true,
        margin: 10,
        nav: false,
        dots: true,
        touchDrag: true, // Enable touch drag
        mouseDrag: true,  // Enable mouse drag
        center: true,
        stagePadding: 200,
    });
});
(function ($) {
    "use strict";

    var $maphelp = $('.ct-googleMap--accordion .ct-googleMap');
    $(".ct-googleMap--accordion .ct-js-mapToogle").click(function () {
        var $this = $(this);
        var $map = $this.parent().find('.ct-googleMap-container');
        $this.html($this.html() == '<i class="fa fa-map-marker"></i> Hide map' ? '<i class="fa fa-map-marker"></i> Show map' : '<i class="fa fa-map-marker"></i> Hide map');

        if ($map.height() != "0") {
            $map.animate({height: '0px'}, 500);
        } else {
            $map.animate({height: $maphelp.data("height") + "px"}, 500);
            setTimeout(function () {
                $('html, body').animate({
                    scrollTop: $map.offset().top - 180
                }, 2000);
            }, 500);
        }
    });
    /* ============================================= */
    /* ==== GOOGLE MAP ==== */

    function initmap() {
        var y_offset = -100;
        var x_offset = 70;
        var offset = -30;

        if (($(".ct-googleMap").length > 0) && (typeof google === 'object' && typeof google.maps === 'object')) {
            $('.ct-googleMap').each(function () {
                var atcenter = "";
                var $this = $(this);
                var location = $this.data("location");
                var zoom = $this.data("zoom");
                var $drag = true;

                if(device.mobile() || device.tablet() || ($devicewidth < 768)){
                    $drag = false;
                }
                else {
                    $drag = true;
                }
                if(device.mobile() || device.tablet() || ($devicewidth < 768)){
                    y_offset = -390;
                    x_offset = -145;
                    offset =-120;
                }

                if (validatedata($this.data("offset"))) {
                    offset = $this.data("offset");
                }

                if (validatedata(location)) {
                    $this.gmap3({
                        marker: {
                            address: location,
                            options: {
                                visible: false,
                            }, callback: function (marker) {
                                atcenter = marker.getPosition();
                            }
                        }, map: {
                            options: {
                                //maxZoom:11,
                                zoom: zoom,
                                styles: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}],

                                mapTypeId: google.maps.MapTypeId.ROADMAP, // ('ROADMAP', 'SATELLITE', 'HYBRID','TERRAIN');
                                scrollwheel: false,
                                disableDoubleClickZoom: false,
                                draggable: $drag, //disableDefaultUI: true,
                                mapTypeControlOptions: {
                                    //mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID],
                                    //style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                                    //position: google.maps.ControlPosition.RIGHT_CENTER
                                    mapTypeIds: []
                                }
                            }, events: {
                                idle: function () {
                                    if (!$this.data('idle')) {
                                        $this.gmap3('get').panBy(0, offset);
                                        $this.data('idle', true);
                                    }
                                }
                            }
                        }, overlay:{
                            address:location,
                            options:{
                                content:
                                "<div class='ct-itemProducts'>"+
                                "<div class='ct-main-content'>" +
                                "<img src='assets/images/demo-content/photo_on_map.jpg' alt=''>" +
                                "<h5 class='ct-u-fontSize24 ct-u-motiveColor ct-u-paddingTop15 ct-fw-600'>Warsaw</h5>" +
                                "<p class='ct-fw-600 ct-u-paddingTop10 ct-u-fontSize14'>ul. Witkowskiego Andrzeja 119</p>" +
                                "<p class='ct-fw-600 ct-u-fontSize14'>02-983 Warszawa</p>" +
                                "<ul class='ct-icons list-unstyled'>" +
                                "<li><i class='fa fa-clock-o'></i><span><span class='ct-fw-600'>Mon-Sat:</span> 8:00am - 7:00pm</span></li>" +
                                "<li><i class='fa fa-phone'></i><span><span class='ct-fw-600'>Tel:</span> (012) 345-6789</span></li>" +
                                "<li><i class='fa fa-envelope-o'></i><span><span class='ct-fw-600'>Mail:</span> warsaw@support.com</span></li>" +
                                "</ul>" +
                                "</div>" +
                                "</div>",
                                offset:{
                                    y:y_offset, //-100
                                    x:x_offset //70
                                }
                            }
                        }
                        //},"autofit"
                    });

                    // center on resize
                    google.maps.event.addDomListener(window, "resize", function () {
                        //var userLocation = new google.maps.LatLng(53.8018,-1.553);
                        setTimeout(function () {
                            $this.gmap3('get').setCenter(atcenter);
                            $this.gmap3('get').panBy(0, offset);
                        }, 400);

                    });

                    // set height
                    $this.css("min-height", $this.data("height") + "px");
                }

                if ($this.parent().parent().hasClass('hidemap')) {
                    $this.parent().animate({height: '0px'}, 500);
                }

            })
        }

    }

    initmap();
})(jQuery);
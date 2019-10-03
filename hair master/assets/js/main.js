/**
 * createIT main javascript file.
 */

var $devicewidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var $deviceheight = (window.innerHeight > 0) ? window.innerHeight : screen.height;
var $bodyel = jQuery("body");


var $navbarel = jQuery(".navbar");
var $topbarel = jQuery(".ct-topBar");


var $lgWidth = 1199;
var $mdWidth = 991;
var $smWidth = 767;
var $xsWidth = 479;

/* ========================== */
/* ==== HELPER FUNCTIONS ==== */

function validatedata($attr, $defaultValue) {
    "use strict";
    if ($attr !== undefined) {
        return $attr
    }
    return $defaultValue;
}

function parseBoolean(str, $defaultValue) {
    "use strict";
    if (str == 'true') {
        return true;
    } else if (str == "false") {
        return false;
    }
    return $defaultValue;
}

(function ($) {
    "use strict";


 // Google Map //------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    var $googleMap = $(".ct-googleMap");

    // 100% Height -----------------------------------------------
    if ($googleMap.attr("data-height") == "100%")
    {
        $googleMap.css("height", $deviceheight + "px");
    }
 //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    if(document.getElementById('ct-js-wrapper')){
        var snapper = new Snap({
            element: document.getElementById('ct-js-wrapper')
        });

        snapper.settings({
            disable: "left",
            easing: 'ease',
            addBodyClasses: true
        });
    }
    $(document).ready(function () {

        /* ================== */
        /* ==== COUNT TO ==== */

        if (($().countTo) && ($().appear) && ($("body").hasClass("cssAnimate"))) {
            $('.ct-js-counter').data('countToOptions', {
                formatter: function (value, options) {
                    return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ');
                }
            }).appear(function () {
                $(this).each(function (options) {
                    var $this = $(this);
                    var $speed = validatedata($this.attr('data-speed'), 700);
                    options = $.extend({}, options || {
                        speed: $speed
                    }, $this.data('countToOptions') || {});
                    $this.countTo(options);
                });
            });
        } else if(($().countTo)){
            $('.ct-js-counter').data('countToOptions', {
                formatter: function (value, options) {
                    return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ');
                }
            });
            $('.ct-js-counter').each(function (options) {
                var $this = $(this);
                var $speed = validatedata($this.attr('speed'), 1200);
                options = $.extend({}, options || {
                    speed: $speed
                }, $this.data('countToOptions') || {});
                $this.countTo(options);
            });
        }

        // Progress Bars // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        if (($().appear) && ($("body").hasClass("cssAnimate"))) {
            $('.progress').appear(function () {
                var $this = $(this);
                $this.each(function () {
                    var $innerbar = $this.find(".progress-bar");
                    var percentage = $innerbar.attr("aria-valuenow");
                    $innerbar.addClass("animating").css("width", percentage + "%");

                });
            }, {accY: -100});
        } else {
            $('.progress').each(function () {
                var $this = $(this);
                var $innerbar = $this.find(".progress-bar");
                var percentage = $innerbar.attr("aria-valuenow");
                $innerbar.addClass("animating").css("width", percentage + "%");

            });
        }


// Progress Icons // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        $('.progress-icons').each(function () {
            var $this = $(this);
            var $total = $this.attr("data-total");
            var $icon = $this.attr("data-icon");
            var htmldata = "";

            $this.css("font-size", ($this.attr("data-font-size") + "px"));

            var i;
            for (i = 0; i < $total; i++) {
                htmldata += '<i class="fa ' + $icon + '"></i> ';
            }

            $this.html(htmldata);

            if (($().appear) && ($("body").hasClass("cssAnimate"))) {
                $('.progress-icons').appear(function () {
                    var $this = $(this);
                    var $active = $this.attr("data-active");
                    var $icons = $this.find('i:lt(' + $active + ')');
                    var $delay = parseInt(validatedata($this.attr("data-delay"), 20))

                    var delay = $delay;
                    for (i = 0; i < $icons.length; i++) {
                        setTimeout((function (i) {
                            return function () {
                                i.style.color = $this.attr("data-icon-color");
                            }
                        })($icons[i]), delay);
                        delay += $delay;
                    }
                }, {accY: -100});
            } else {
                $this.each(function () {
                    var $active = $this.attr("data-active");
                    var $icons = $this.find('i:lt(' + $active + ')');
                    $icons.css('color', $this.attr("data-icon-color"))
                });
            }
        })

        // Calendar //----------------------------------------------------------------
        $('.ct-js-datetimePicker').datetimepicker({
            pickTime: false
        });

//Magnific Popup///////////////////////////////////////////////////////////////////////////////////////////
        if(jQuery().magnificPopup){
            jQuery('.ct-js-popupGallery').each(function() { // the containers for all your galleries
                jQuery(this).magnificPopup({
                    disableOn: 700,
                    type: 'image',
                    mainClass: 'ct-magnificPopup--image',
                    removalDelay: 160,
                    preloader: true,
                    delegate: '.ct-js-popup',
                    closeBtnInside: true,
                    closeOnContentClick: false,
                    closeOnBgClick: true,
                    gallery: {
                        enabled: true
                    }
                });
            });
        }

        // Add spinner points // --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        $(".ct-single-point").each(function(){
            if($(this).attr("data-bottom-position")){  $(this).css('bottom', $(this).attr("data-bottom-position") + "%");  }
            if($(this).attr("data-right-position")){  $(this).css('right', $(this).attr("data-right-position") + "%");    }
        });
        $(".ct-mainHeader").each(function(){
            if($(this).attr("data-bg-image")){
                $(this).css('background-image', 'url("' + $(this).attr("data-bg-image") + '")');
            }
        });

        //Select 2// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        $(".ct-selectCity").select2({
            placeholder: "Select City",
            allowClear: false
        });
        $(".ct-selectTime").select2({
            placeholder: "Please choose an hour",
            allowClear: false
        });
        $(".ct-selectContact").select2({
            placeholder: "Please choose a method",
            allowClear: false
        });
        $(".ct-selectLocation").select2({
            placeholder: "Choose Your Options",
            allowClear: false
        });

        // Add Color // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        $(".ct-js-color").each(function(){
            $(this).css("color", '#' + $(this).attr("data-color"))
        })

        // Snap Navigation in Mobile // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        if ($devicewidth > 767 && document.getElementById('ct-js-wrapper')) {
            snapper.disable();
        }

        $(".navbar-toggle").click(function () {
            if($bodyel.hasClass('snapjs-right')){
                snapper.close();
            } else{
                snapper.open('right');
            }
        });

        $('.ct-menuMobile .ct-menuMobile-navbar .dropdown > a').on("click",function(e) {
            return false; // iOS SUCKS
        })
        $('.ct-menuMobile .ct-menuMobile-navbar .dropdown > a, .ct-menuMobile .ct-menuMobile-navbar .dropdown-submenu > a').click(function(e){
            var $this = $(this);
            if($this.parent().hasClass('open')){
                $(this).parent().removeClass('open');
            } else{
                $(this).parent().addClass('open');
            }
            return false; // iOS SUCKS
        })

        $('.ct-menuMobile .ct-menuMobile-navbar .onepage > a').on("click",function(e) {
            snapper.close();
        })

        // Animations Init // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        if ($().appear) {
            if (device.mobile() || device.tablet()) {
                $("body").removeClass("cssAnimate");
            } else {

                $('.cssAnimate .animated').appear(function () {
                    var $this = $(this);

                    $this.each(function () {
                        if ($this.data('time') != undefined) {
                            setTimeout(function () {
                                $this.addClass('activate');
                                $this.addClass($this.data('fx'));
                            }, $this.data('time'));
                        } else {
                            $this.addClass('activate');
                            $this.addClass($this.data('fx'));
                        }
                    });
                }, {accX: 50, accY: -350});
            }
        }


        // Tooltips and Popovers // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        $("[data-toggle='tooltip']").tooltip();

        $("[data-toggle='popover']").popover({trigger: "hover", html: true});

        // Link Scroll to Section // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        $('.ct-js-btnScroll[href^="#"]').on("click",function(e) {
            e.preventDefault();

            var target = this.hash, $target = $(target);

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top - 70
            }, 900, 'swing', function () {
                window.location.hash = target;
            });
        });
        $('.ct-js-btnScrollUp').on("click",function(e) {
            e.preventDefault();
            $("body,html").animate({scrollTop: 0}, 1200);
            $navbarel.find('.onepage').removeClass('active');
            $navbarel.find('.onepage:first-child').addClass('active');
            return false;
        });

        // Navbar Search // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        var $searchform = $(".ct-navbar-search");
        $('#ct-js-navSearch').on("click",function(e) {
            e.preventDefault();

            $(this).toggleClass('is-active');
            $searchform.fadeToggle(250, function () {
                if (($searchform).is(":visible")) {
                    $searchform.find("[type=text]").focus();
                }
            });
            return false;
        })

        // Placeholder Fallback // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        if ($().placeholder) {
            $("input[placeholder],textarea[placeholder]").placeholder();
        }
    })

    $(window).on('resize', function() {
        if ($(window).width() < 768) {
            snapper.enable();
        } else{
            snapper.disable();
        }
    })

    $(window).load(function () {
        // Loader //----------------------------------------------------------------
        var $preloader = $('.ct-preloader');
        var $content = $('.ct-preloader-content');


        var $timeout = setTimeout(function(){
            $($preloader).addClass('animated').addClass('fadeOut');
            $($content).addClass('animated').addClass('fadeOut');

        }, 0);
        var $timeout2 = setTimeout(function(){
            $($preloader).css('display', 'none').css('z-index', '-9999');
        }, 500);

        //---------------------------------------------------------------------------
        if($(".ct-js-mapPoints")){

            $('.ct-single-point').each(function(){

                $(this).on('click', function() {
                    $('.ct-imageLine').html("");
                    var selectedPoint = $(this);
                    if (selectedPoint.hasClass('is-open')) {
                        selectedPoint.removeClass('is-open').addClass('visited');
                    } else {
                        selectedPoint.addClass('is-open').siblings('.ct-single-point.is-open').removeClass('is-open').addClass('visited');
                    }
                    var $pos = $(this).index();
                    $(".ct-more-info.active").removeClass("active");
                    $(".ct-more-info").eq($pos).addClass("active");

                    var $imgOffsetY = 140;
                    var $pinOffsetX =12;
                    var $pinOffsetY = 12;
                    var $x = $(".ct-more-info").eq($pos).find(".ct-moreInfo-inner-image").offset().left;
                    var $y = $(".ct-more-info").eq($pos).find(".ct-moreInfo-inner-image").offset().top;

                    $('.ct-imageLine').line($(this).offset().left+$pinOffsetX, $(this).offset().top+$pinOffsetY, $x-5, $y+$imgOffsetY, {color:"#fe988a", zindex:1000});

                    $('.ct-single-point').css('z-index', 500);
                    $(this).css('z-index', 2000);
                });

                //$('#ala').addClass('is-open');
            });
        }
        $(".ct-single-point.is-open").trigger("click");

        // Masonry For Sidebar // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        if (jQuery().masonry  && (jQuery(window).width()<992) && (jQuery(window).width()>767)) {

            jQuery('.ct-js-sidebar .row').masonry({
                itemSelector: '.col-sm-6.col-md-12',
                layoutMode: 'sloppyMasonry',
                resizable: false, // disable normal resizing
                // set columnWidth to a percentage of container width
                masonry: { }
            });
        }

        /* ==================== */
        /* ==== PIE CHARTS ==== */
        $('.ct-js-pieChart').each(function () {
            var $this = $(this);
            var $color = validatedata($(this).attr('data-ct-firstColor'), "#2b8be9");
            var $color2 = validatedata($(this).attr('data-ct-secondColor'), "#eeeeee");
            var $cutout = validatedata($(this).attr('data-ct-middleSpace'), 90);
            var $stroke = validatedata($(this).attr('data-ct-showStroke'), false);
            var $margin = validatedata($(this).attr('data-ct-margin'), false);
            $(this).parent().css('margin-left',$margin + 'px');
            $(this).parent().css('margin-right',$margin + 'px');
            var options = {
                responsive: true, percentageInnerCutout: $cutout, segmentShowStroke: $stroke, showTooltips: false
            }
            var doughnutData = [{
                value: parseInt($this.attr('data-ct-percentage')), color: $color, label: false
            }, {
                value: parseInt(100 - $this.attr('data-ct-percentage')), color: $color2
            }];

            if (($().appear) && ($("body").hasClass("cssAnimate"))) {
                $('.ct-js-pieChart').appear(function () {
                    var ctx = $this[0].getContext("2d");
                    window.myDoughnut = new Chart(ctx).Doughnut(doughnutData, options);
                });
            } else {
                var ctx = $this[0].getContext("2d");
                window.myDoughnut = new Chart(ctx).Doughnut(doughnutData, options);
            }
        })

    })

    $(window).scroll(function(){
        var scroll = $(window).scrollTop();

        if (scroll > 400) {
            jQuery('.ct-js-btnScrollUp').addClass('is-active');
        } else {
            jQuery('.ct-js-btnScrollUp').removeClass('is-active');
        }
    })

})(jQuery);
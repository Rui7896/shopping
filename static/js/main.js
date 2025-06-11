jQuery(function ($) {

    'use strict';

    // Preloader

    // -------------------------------------------------------------
    //  Preloader
    // -------------------------------------------------------------

    $(window).on("load", function(){
        $('#preloader').fadeOut('slow',function(){$(this).remove();});
    });

    // -------------------------------------------------------------
    //  Toggle Menu for Mobile
    // -------------------------------------------------------------

    mobileDropdown ();
    function mobileDropdown () {
      if($('.navbar-nav').length) {
        $('.navbar-nav .sa-dropdown').append(function () {
          return '<i class="fas fa-chevron-down icon"></i>';
        });
        $('.navbar-nav .sa-dropdown .icon').on('click', function () {
          $(this).parent('li, .sa-dropdown').children('ul, .sa-dropdown-menu').slideToggle();
        });
      }
    }   

    // -------------------------------------------------------------
    // News Slider
    // -------------------------------------------------------------

    var ticker = $('#ticker'),
        container = ticker.find('ul'),
        tickWidth = 1,
        speed = 0.1, 
        distance,
        timing;

        container.find("li").each(function(i) {
        tickWidth += $(this, i).outerWidth(true);
        });

        distance = tickWidth + (ticker.outerWidth() - $('#gameLabel').outerWidth());
        timing = distance / speed;

        function scrollIt(dist, dur) {
        container.animate({
          left: '-=' + dist
        }, dur, 'linear', function() {
          container.css({
            'left': ticker.outerWidth()
          });
          scrollIt(distance, timing);
        });
        }

        scrollIt(distance, timing);

        ticker.hover(function() {
        container.stop();
        }, function() {
        var offset = container.offset(),
          newPosition = offset.left + tickWidth,
          newTime = newPosition / speed;
        scrollIt(newPosition, newTime);
    });       

    /*==============================================================*/
    // TheiaStickySidebar
    /*==============================================================*/

    $('.sa-sticky')
        .theiaStickySidebar({
            additionalMarginTop: 0
    });

    // -------------------------------------------------------------
    //  MagnificPopup
    // -------------------------------------------------------------

    $('.sa-popup').magnificPopup({type:'iframe'});        

    // -------------------------------------------------------------
    //  Slick Slider
    // -------------------------------------------------------------  

    $(".news-ticker").slick({
        infinite: true,
        dots: false,
        arrows: true,
        slidesToShow: 1,
        autoplay:true,
        autoplaySpeed: 1000, 
        speed: 1000,
        fade:true,
        pauseOnHover:true,
        slidesToScroll: 1,
        nextArrow: '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        prevArrow: '<i class="fa fa-angle-right" aria-hidden="true"></i>',
    });     

    $(".post-slider").slick({
        infinite: true,
        dots: false,
        arrows: true,
        slidesToShow: 1,
        autoplay:true,
        autoplaySpeed:10000,
        slidesToScroll: 1,
        nextArrow: '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        prevArrow: '<i class="fa fa-angle-right" aria-hidden="true"></i>',
    });    

    $('.home-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        speed: 1500,
        autoplay:true,
        nextArrow: '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        prevArrow: '<i class="fa fa-angle-right" aria-hidden="true"></i>',
        asNavFor: '.home-slider-nav'
    });
    
    $('.home-slider-nav').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.home-slider',
        dots: false,
        speed: 1500,
        arrows: false,
        focusOnSelect: true,
        responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow:4,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 481,
          settings: {
            slidesToShow: 1,
          }
        }
        ] 
    });

    $(".breaking-news-slider").slick({
        infinite: true,
        dots: false,
        arrows: true,
        slidesToShow: 3,
        autoplay:true,
        slidesToScroll: 1,
        swipe: false,
        vertical: true,
        verticalScrolling: true,        
        nextArrow: '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        prevArrow: '<i class="fa fa-angle-right" aria-hidden="true"></i>',
        responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow:2,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 481,
          settings: {
            slidesToShow: 1,
          }
        }
        ] 
    }); 

    $(".latest-slider").slick({
        infinite: true,
        dots: true,
        arrows: false,
        slidesToShow: 3,
        autoplay:true,
        autoplaySpeed:10000,
        slidesToScroll: 1,
        nextArrow: '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        prevArrow: '<i class="fa fa-angle-right" aria-hidden="true"></i>',
        responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 481,
          settings: {
            slidesToShow: 1,
          }
        }
        ] 
    });  

    $('.gallery-slider').slick({
        infinite: true,
        dots: true,
        arrows: false,
        slidesToShow: 1,
        autoplay:true,
        autoplaySpeed:10000,
        slidesToScroll: 1,
        nextArrow: '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        prevArrow: '<i class="fa fa-angle-right" aria-hidden="true"></i>',
        asNavFor: '.gallery-slider-nav'
    });
    
    $('.gallery-slider-nav').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        asNavFor: '.gallery-slider',
        dots: false,
        speed: 1500,
        arrows: false,
        focusOnSelect: true,
        nextArrow: '<i class="fa fa-angle-right" aria-hidden="true"></i>',
        prevArrow: '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow:4,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 481,
          settings: {
            slidesToShow: 2,
          }
        }
        ] 
    });    
        
    // -------------------------------------------------------------
    //  Date Time
    // -------------------------------------------------------------

    var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]; 
    var dayNames= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    var newDate = new Date();
    newDate.setDate(newDate.getDate());
    $('#date_time').html(dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());


    /*==============================================================*/
    // Select
    /*==============================================================*/    

    $('.sa-language select').each(function(){
        var $this = $(this), numberOfOptions = $(this).children('option').length;
      
        $this.addClass('select-hidden'); 
        $this.wrap('<div class="select"></div>');
        $this.after('<div class="select-styled"></div>');

        var $styledSelect = $this.next('div.select-styled');
        $styledSelect.text($this.children('option').eq(0).text());
      
        var $list = $('<ul />', {
            'class': 'select-options'
        }).insertAfter($styledSelect);
      
        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }
      
        var $listItems = $list.children('li');
      
        $styledSelect.click(function(e) {
            e.stopPropagation();
            $('div.select-styled.active').not(this).each(function(){
                $(this).removeClass('active').next('ul.select-options').hide();
            });
            $(this).toggleClass('active').next('ul.select-options').toggle();
        });
      
        $listItems.click(function(e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide();
        });
      
        $(document).click(function() {
            $styledSelect.removeClass('active');
            $list.hide();
        });

    });    

    /*==============================================================*/
    // Send Email
    /*==============================================================*/ 

    $('#contactform').submit(function (e) {
        $('.flashinfo').hide();
        e.preventDefault();
    })
    .validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            phoneNumber: {
                digits: true,
                required: true,
                minlength: 5,
                maxlength: 12
            },
            name: {
                required: true,
                minlength: 5
            },
            subject: {
                required: true,
                minlength: 10
            },
            message: {
                required: true,
                minlength: 10
            }
        },
        messages: {
            email: {
                required: 'Check your email input '
            },
            name: {
                required: 'Please check your first name input'
            },
            subject: {
                required: 'Please check your message subject input'
            },
            message: {
                required: 'Please write something for us'
            }
        },
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: "https://mailpostexample.herokuapp.com/",
                data: $(form).serialize(),
                beforeSend: function () {
                    $('.flashinfo').hide();
                    $('.btn-l').html('Sending...')
                    $('input, textarea').attr('readonly', "readonly");
                },
                success: function (msg) {
                    if (msg == 'your message send') {
                        $('#contactform').trigger("reset");
                        $('.btn-l').html('Send Now')
                        $('input, textarea').removeAttr('readonly');
                        $('.flashinfo').show();
                        $('.flashinfo').html('Your message has been sent, I will reply to you shortly');
                    } else {
                        $('input, textarea').removeAttr('readonly');
                        $('#contactform').trigger("reset");
                        $('.flashinfo').show();
                        $('.flashinfo').html('<span>report_problem</span>something unknown error');
                    }
                }
            });
            return false;
        }
    });
// script end
});

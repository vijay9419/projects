jQuery(window).trigger('resize').trigger('scroll');
$('.parallax-window').parallax({
    naturalWidth: 600,
    naturalHeight: 400
});

$(".testimonial").owlCarousel({
    loop: true,
    margin: 10,
    autoplay: true,
    responsive: {
        0: {
            items: 1,
        },
        600: {
            items: 1,
        },
        1000: {
            items: 1,
        },
    },
});

$(".certificates__").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    // autoplay: true,
    responsive: {
        0: {
            items: 2,
        },
        600: {
            items: 3,
        },
        1000: {
            items: 4,
        },
    },
});

$('.google__reviews').owlCarousel({
    dots: true,
    // autoplay:true,
    responsive: {
        0: {
            items:1,
        },
        576: {
            items:2,
        },
        1000: {
            items:3,
        }
    }
})

$('.benefits__courses').owlCarousel({
    nav: true,
    autoplay:true,
    responsive: {
        0: {
            items:1,
        },
        576: {
            items:2,
        },
        1000: {
            items:3,
        }
    }
})


$('.google__reviews-new').owlCarousel({
    nav: true,
    dots: true,
    // autoplay:true,
    responsive: {
        0: {
            items:1,
        },
        576: {
            items:2,
        },
        1000: {
            items:2,
        }
    }
})

function openNav() {
    document.getElementById("mobile__menu").style.height = "100%";
}

function closeNav() {
    document.getElementById("mobile__menu").style.height = "0%";
}

// ---------------
// reveal start
// ---------------
function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}

window.addEventListener("scroll", reveal);
// ---------------
// reveal end
// ---------------

// testimonia video blog start
var sync1 = $("#sync1");
var sync2 = $("#sync2");
var slidesPerPage = 4; //globaly define number of elements per page
var syncedSecondary = true;

sync1.owlCarousel({
    items: 1,
    slideSpeed: 2000,
    autoplay: false,
    dots: false,
    nav: true,
    loop: true,
    responsiveRefreshRate: 200,
    navText: ['<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>', '<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'],
}).on('changed.owl.carousel', syncPosition);

sync2
    .on('initialized.owl.carousel', function () {
        sync2.find(".owl-item").eq(0).addClass("current");
    })
    .owlCarousel({
        items: slidesPerPage,
        margin: 40,
        smartSpeed: 200,
        slideSpeed: 500,
        slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
        responsiveRefreshRate: 100,
        responsive: {
            0: {
                margin: 20,
            }
        },
    }).on('changed.owl.carousel', syncPosition2);

function syncPosition(el) {
    //if you set loop to false, you have to restore this next line
    //var current = el.item.index;

    //if you disable loop you have to comment this block
    var count = el.item.count - 1;
    var current = Math.round(el.item.index - (el.item.count / 2) - .5);

    if (current < 0) {
        current = count;
    }
    if (current > count) {
        current = 0;
    }

    //end block

    sync2
        .find(".owl-item")
        .removeClass("current")
        .eq(current)
        .addClass("current");
    var onscreen = sync2.find('.owl-item.active').length - 1;
    var start = sync2.find('.owl-item.active').first().index();
    var end = sync2.find('.owl-item.active').last().index();

    if (current > end) {
        sync2.data('owl.carousel').to(current, 100, true);
    }
    if (current < start) {
        sync2.data('owl.carousel').to(current - onscreen, 100, true);
    }
}

function syncPosition2(el) {
    if (syncedSecondary) {
        var number = el.item.index;
        sync1.data('owl.carousel').to(number, 100, true);
    }
}

sync2.on("click", ".owl-item", function (e) {
    e.preventDefault();
    var number = $(this).index();
    sync1.data('owl.carousel').to(number, 300, true);
});
// testimonia video blog start start

// fix header start

$(window).scroll(function () {
    var sticky = $('header'),
        scroll = $(window).scrollTop();
    if (scroll >= 100) sticky.addClass('fixed');
    else sticky.removeClass('fixed');
});

  // fix header end




// testimonial slider -->

  // vars
"use strict";
var testim = document.getElementById("testim"),
    testimDots = Array.prototype.slice.call(
        document.getElementById("testim-dots").children
    ),
    testimContent = Array.prototype.slice.call(
        document.getElementById("testim-content").children
    ),
    testimLeftArrow = document.getElementById("left-arrow"),
    testimRightArrow = document.getElementById("right-arrow"),
    testimSpeed = 7000,
    currentSlide = 0,
    currentActive = 0,
    testimTimer,
    touchStartPos,
    touchEndPos,
    touchPosDiff,
    ignoreTouch = 30;
window.onload = function() {
    // Testim Script
    function playSlide(slide) {
        for (var k = 0; k < testimDots.length; k++) {
            testimContent[k].classList.remove("active");
            testimContent[k].classList.remove("inactive");
            testimDots[k].classList.remove("active");
        }

        if (slide < 0) {
            slide = currentSlide = testimContent.length - 1;
        }

        if (slide > testimContent.length - 1) {
            slide = currentSlide = 0;
        }

        if (currentActive != currentSlide) {
            testimContent[currentActive].classList.add("inactive");
        }
        testimContent[slide].classList.add("active");
        testimDots[slide].classList.add("active");

        currentActive = currentSlide;

        clearTimeout(testimTimer);
        testimTimer = setTimeout(function() {
            playSlide((currentSlide += 1));
        }, testimSpeed);
    }

    testimLeftArrow.addEventListener("click", function() {
        playSlide((currentSlide -= 1));
    });

    testimRightArrow.addEventListener("click", function() {
        playSlide((currentSlide += 1));
    });

    for (var l = 0; l < testimDots.length; l++) {
        testimDots[l].addEventListener("click", function() {
            playSlide((currentSlide = testimDots.indexOf(this)));
        });
    }

    playSlide(currentSlide);

    // keyboard shortcuts
    document.addEventListener("keyup", function(e) {
        switch (e.keyCode) {
            case 37:
                testimLeftArrow.click();
                break;

            case 39:
                testimRightArrow.click();
                break;

            case 39:
                testimRightArrow.click();
                break;

            default:
                break;
        }
    });

    testim.addEventListener("touchstart", function(e) {
        touchStartPos = e.changedTouches[0].clientX;
    });

    testim.addEventListener("touchend", function(e) {
        touchEndPos = e.changedTouches[0].clientX;

        touchPosDiff = touchStartPos - touchEndPos;

        console.log(touchPosDiff);
        console.log(touchStartPos);
        console.log(touchEndPos);

        if (touchPosDiff > 0 + ignoreTouch) {
            testimLeftArrow.click();
        } else if (touchPosDiff < 0 - ignoreTouch) {
            testimRightArrow.click();
        } else {
            return;
        }
    });
};
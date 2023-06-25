
// ---- Sticky Navbar js start  ------
var yourNavigation = $(".navbar");
stickyDiv = "sticky";
yourHeader = $('.top-Header').height();

$(window).scroll(function () {
    if ($(this).scrollTop() > yourHeader) {
        yourNavigation.addClass(stickyDiv);
    } else {
        yourNavigation.removeClass(stickyDiv);
    }
});
// ---- Sticky Navbar js End ------

$(document).ready(function () {
    // -- Home slider strat -----

    $('.video-carousel').owlCarousel({
        items: 1,
        loop: true,
        nav: false,
        dots: true,
        responsive: {
            0: {
                items: 1
            },
        }
    })
    // -- Home slider End -----

    $('.seller-carousel').owlCarousel({
        loop: true,
        nav: true,
        dots: true,
        margin:20,
        responsive: {
            0: {
                items: 1.5,
            },
            600: {
                items: 3
            },
            1000: {
                items: 4
            }
        }
    })


});

// --- Video button js start ---------
var myVideo = document.getElementById("videoText");

function playPauseOne() {
    if (myVideo.paused)
        myVideo.play();
    else
        myVideo.pause();
}

// var myVideos = document.getElementById("myVideo");

// function playPauseTwo() {
//     if (myVideos.paused)
//         myVideos.play();
//     else
//         myVideos.pause();
// }

// --- video button js end ------------



$(document).ready(function () {

    var sync1 = $("#sync1");
    var sync2 = $("#sync2");
    var slidesPerPage = 3; //globaly define number of elements per page
    var syncedSecondary = true;

    sync1.owlCarousel({
        
        items: 1,
        slideSpeed: 2000,
        nav: false,
        autoplay: false,
        dots: true,
        loop: true,
        responsiveRefreshRate: 200,
    }).on('changed.owl.carousel', syncPosition);

    sync2
        .on('initialized.owl.carousel', function () {
            sync2.find(".owl-item").eq(0).addClass("current");
        })
        .owlCarousel({
            items: slidesPerPage,
            dots: true,
            nav: false,
            smartSpeed: 200,
            slideSpeed: 500,
            slideBy: slidesPerPage,
            responsiveRefreshRate: 100,
            responsive: {
                0: {
                    items: 1.5,
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 3
                }
            }
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
});

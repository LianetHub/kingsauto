"use strict";

//  init Fancybox
if (typeof Fancybox !== "undefined" && Fancybox !== null) {
    Fancybox.bind("[data-fancybox]", {
        dragToClose: false,
        closeButton: false
    });
}

$(function () {

    // detect user OS
    const isMobile = {
        Android: () => /Android/i.test(navigator.userAgent),
        BlackBerry: () => /BlackBerry/i.test(navigator.userAgent),
        iOS: () => /iPhone|iPad|iPod/i.test(navigator.userAgent),
        Opera: () => /Opera Mini/i.test(navigator.userAgent),
        Windows: () => /IEMobile/i.test(navigator.userAgent),
        any: function () {
            return this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows();
        },
    };


    function getNavigator() {
        if (isMobile.any() || $(window).width() < 992) {
            $('body').removeClass('_pc').addClass('_touch');
        } else {
            $('body').removeClass('_touch').addClass('_pc');
        }
    }

    getNavigator();

    $(window).on('resize', () => {
        getNavigator();
    });


    // detect support WebP

    function testWebP(callback) {
        let webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    }

    testWebP((support) => {
        $('body').addClass(support ? 'webp' : 'no-webp');
    });


    // event handlers
    $(document).on('click', (e) => {
        const $target = $(e.target);

        if ($target.closest('.menu__btn').length) {
            toggleMenu();
        }

        if ($target.hasClass('menu__arrow')) {
            const $subMenu = $target.next('.submenu');

            if ($('.menu__arrow.active').get(0) !== $target.get(0)) {
                $('.submenu.open').removeClass('open');
                $('.menu__arrow.active').removeClass('active');
            }

            $subMenu.toggleClass('open');
            $target.toggleClass('active');
        }

        if ($target.is('.brands__all')) {
            $target.closest('.brands__list').find('.brands__item.brands__item-more').toggleClass('visible');
            $target.toggleClass('active')
            if ($target.hasClass('active')) {
                $target.text("Скрыть")
            } else {
                $target.text("Все марки")
            }
        }

        if ($target.is('.reviews__card-btn')) {
            $target.prev().toggleClass('full');
            $target.toggleClass('active')
            if ($target.hasClass('active')) {
                $target.text("Скрыть")
            } else {
                $target.text("Читать полностью")
            }
        }

    });

    function toggleMenu() {
        $('body').toggleClass('lock');
        $('.header').toggleClass('open-menu');
    }

    //  sliders

    if ($('.promo__slider').length) {
        new Swiper('.promo__slider', {
            slidesPerView: 1,
            speed: 800,
            effect: "fade",
            loop: true,
            autoplay: {
                delay: 8000,
                stopOnLastSlide: false,
            },
            fadeEffect: {
                crossFade: true
            },
            pagination: {
                el: '.promo__pagination',
                clickable: true,
            },
            on: {
                beforeInit: (swiper) => {
                    let speed = swiper.params.speed;
                    let autoplaySpeed = swiper.params.autoplay.delay;

                    $('.promo__pagination').css('--counting-speed', ((speed + autoplaySpeed) / 1000) + "s");
                }
            }
        });
    }

    $('.selections__slider').each((_, selectionsSlider) => {
        const $slider = $(selectionsSlider).find('.swiper');
        const $prevBtn = $(selectionsSlider).find('.selections__prev');
        const $nextBtn = $(selectionsSlider).find('.selections__next');
        const $paginationBlock = $(selectionsSlider).find('.selections__pagination');

        new Swiper($slider[0], {
            speed: 800,
            slidesPerView: "auto",
            spaceBetween: 20,
            navigation: {
                nextEl: $nextBtn[0],
                prevEl: $prevBtn[0]
            },
            pagination: {
                el: $paginationBlock[0],
                clickable: true
            },
            breakpoints: {
                767.98: {
                    slidesPerView: 3,
                }
            }
        });
    });

    $('.auto-card__slider').each((_, autoImagesSlider) => {
        const $paginationBlock = $(autoImagesSlider).find('.auto-card__slider-pagination');

        new Swiper(autoImagesSlider, {
            speed: 800,
            slidesPerView: 1,
            pagination: {
                el: $paginationBlock[0],
                clickable: true
            },
        });
    });


    const $headerElement = $('.header');

    const callback = (entries) => {
        if (entries[0].isIntersecting) {
            $headerElement.removeClass('scroll');
        } else {
            $headerElement.addClass('scroll');
        }
    };

    const headerObserver = new IntersectionObserver(callback);
    headerObserver.observe($headerElement[0]);


    // tabs
    class Tabs {
        constructor(wrapper) {
            this.$wrapper = $(wrapper);
            this.$tabButtons = this.$wrapper.find('.tabs__item');
            this.$tabContents = this.$wrapper.find('.tab-content');
            this.init();
        }

        init() {
            this.$tabButtons.each((index, button) => {
                $(button).on('click', () => this.activateTab(index));
            });
        }

        activateTab(index) {
            this.$tabButtons.removeClass('active');
            this.$tabContents.removeClass('active');

            this.$tabButtons.eq(index).addClass('active');
            this.$tabContents.eq(index).addClass('active');
        }
    }

    $('.tabs-wrapper').each((_, wrapper) => new Tabs(wrapper));


    // form submit checkbox validation

    $('form').on('submit', function (e) {
        let isValid = true;

        // aria-required="true" observer
        $(this).find('[aria-required="true"]').each(function () {

            if ($(this).is(':checkbox')) {
                if (!$(this).is(':checked')) {
                    $(this).addClass('error');
                    isValid = false;
                }
            } else {
                if ($(this).val().trim() === '') {
                    $(this).addClass('error');
                    isValid = false;
                }
            }
        });

        if (!isValid) {
            e.preventDefault();
        }
    });


    $('[aria-required="true"]').on('change input', function () {
        if ($(this).is(':checkbox')) {
            if ($(this).is(':checked')) {
                $(this).removeClass('error');
            }
        } else {
            if ($(this).val().trim() !== '') {
                $(this).removeClass('error');
            }
        }
    });





})





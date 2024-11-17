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

        if ($target.is('.favorite-btn')) {
            $target.toggleClass('active')
        }

        if ($target.is('.catalog__filter-btn')) {
            $('.filter').addClass('visible');
            $('body').addClass('filter-lock');
        }

        if ($target.is('.filter.visible') || $target.is('.filter__close') || $target.is('.filter__reset')) {
            $('.filter').removeClass('visible');
            $('body').removeClass('filter-lock');
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

    if ($('.catalog__filter-categories').length) {
        new Swiper('.catalog__filter-categories', {
            slidesPerView: "auto",
            speed: 800,
            spaceBetween: 5,
        });
    }



    // observer header scroll
    const callback = (entries) => {
        if (entries[0].isIntersecting) {
            $('.header').removeClass('scroll');
        } else {
            $('.header').addClass('scroll');
        }
    };

    const headerObserver = new IntersectionObserver(callback);
    headerObserver.observe($('.header')[0]);



    // observer header height
    function updateHeaderHeight() {
        var headerHeight = $('.header__wrapper').outerHeight() / parseFloat($('html').css('font-size'));

        $('body').css('--header-height', headerHeight + 'rem');
    }

    updateHeaderHeight();

    $(window).on('resize', function () {
        updateHeaderHeight();
    });


    // change layout type in catalog
    $('.catalog__layout-input').on('change', function (e) {
        if ($(e.target).val() === 'rows') {
            $(".catalog__grid").addClass('rows')
        } else {
            $(".catalog__grid").removeClass('rows')
        }
    })




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






    // dropdown

    const saveInitialState = ($dropdown) => {
        const $btn = $dropdown.find('.dropdown__button');
        const $list = $dropdown.find('.dropdown__list');
        const $dropdownInput = $dropdown.find('.dropdown__input');

        const initialState = {
            selectedText: $btn.html(),
            selectedValue: $dropdownInput.val(),
            isOpen: $btn.attr('aria-expanded') === 'true',
            hasScroll: $list[0].scrollHeight > $list[0].clientHeight
        };

        $dropdown.data('initialState', initialState);
    };


    const restoreInitialState = ($dropdown) => {
        const initialState = $dropdown.data('initialState');


        if (!initialState) return;

        const $btn = $dropdown.find('.dropdown__button');
        const $list = $dropdown.find('.dropdown__list');
        const $dropdownItems = $dropdown.find('.dropdown__list-item');
        const $dropdownInput = $dropdown.find('.dropdown__input');


        $btn.html(initialState.selectedText);

        $dropdownInput.val(initialState.selectedValue);
        $btn.attr('aria-expanded', initialState.isOpen ? 'true' : 'false');
        $list.attr('aria-hidden', initialState.isOpen ? 'false' : 'true');


        if (initialState.hasScroll) {
            $list.addClass('has-scroll');
        } else {
            $list.removeClass('has-scroll');
        }

        if (initialState.isOpen) {
            $dropdown.addClass('visible');
        } else {
            $dropdown.removeClass('visible');
        }

        const $firstItem = $dropdownItems.first();
        $dropdownItems.removeClass('active').removeAttr('aria-checked');
        $firstItem.addClass('active').attr('aria-checked', 'true');
    };


    const toggleDropdown = ($dropdown, isOpen) => {
        const $btn = $dropdown.find('.dropdown__button');
        const $list = $dropdown.find('.dropdown__list');
        $btn.attr('aria-expanded', isOpen);
        $list.attr('aria-hidden', !isOpen);
        if (isOpen) {
            $dropdown.removeClass('dropdown-top');
            const dropdownRect = $list[0].getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            if (dropdownRect.bottom > viewportHeight) {
                $dropdown.addClass('dropdown-top');
            }

            $dropdown.addClass('visible');
            $btn.addClass('active');
            if ($list[0].scrollHeight > $list[0].clientHeight) {
                $list.addClass('has-scroll');
            } else {
                $list.removeClass('has-scroll');
            }
        } else {
            $dropdown.removeClass('visible');
            $btn.removeClass('active');
        }
    };

    const setupDropdown = $dropdown => {
        const $dropdownBtn = $dropdown.find('.dropdown__button');
        const $dropdownList = $dropdown.find('.dropdown__list');
        const $dropdownItems = $dropdownList.find('.dropdown__list-item');
        const $dropdownInput = $dropdown.find('.dropdown__input');

        $dropdown.attr('role', 'listbox');
        $dropdownItems.attr('role', 'option');


        $dropdownBtn.on('click', () => {
            const isOpen = $dropdownBtn.attr('aria-expanded') === 'true';
            toggleDropdown($dropdown, !isOpen);
        });

        $dropdownItems.on('click', function () {
            $dropdownItems
                .removeClass('active')
                .removeAttr('aria-checked');

            $(this)
                .addClass('active')
                .attr('aria-checked', 'true');

            const $textContainer = $dropdownBtn.find('.dropdown__button-text');
            if ($textContainer.length) {
                $textContainer.text($(this).text());
            } else {
                $dropdownBtn.text($(this).text());
            }
            $dropdownInput.val($(this).data('value'));

            toggleDropdown($dropdown, false);
            $dropdownInput.trigger('change');
        });
    };


    const closeAllDropdownsOnClickOutside = e => {
        $('.dropdown.visible').each(function () {
            const $dropdown = $(this);
            if (!$dropdown.is(e.target) && $dropdown.has(e.target).length === 0) {
                toggleDropdown($dropdown, false);
            }
        });
    };

    const closeAllDropdownsOnEscape = e => {
        if (e.key === 'Escape') {
            $('.dropdown.visible').each(function () {
                toggleDropdown($(this), false);
            });
        }
    };

    const handleFormReset = (e) => {
        $(e.target).closest('form').find('.dropdown').each(function () {
            restoreInitialState($(this));
        });
    };

    $('.dropdown').each(function () {
        saveInitialState($(this));
        setupDropdown($(this));
    });

    $(document).on('click', closeAllDropdownsOnClickOutside);
    $(document).on('keydown', closeAllDropdownsOnEscape);

    $(document).on('reset', 'form', handleFormReset);







})





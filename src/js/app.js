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
    // function testWebP(callback) {
    //     let webP = new Image();
    //     webP.onload = webP.onerror = function () {
    //         callback(webP.height == 2);
    //     };
    //     webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    // }

    // testWebP((support) => {
    //     $('body').addClass(support ? 'webp' : 'no-webp');
    // });



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

        if ($target.is('.filter.visible') || $target.is('.filter__close')) {
            $('.filter').removeClass('visible');
            $('body').removeClass('filter-lock');
        }

        if ($target.is('.type-btn-toggler')) {
            const $prevInput = $target.prev('.switcher__input');
            const $nextInput = $target.next('.switcher__input');

            if ($prevInput.is(':checked')) {
                $nextInput.prop('checked', true);
            } else {
                $prevInput.prop('checked', true);
            }
        }

        if ($target[0].closest('.info__item-title')) {
            $target.closest('.info__item-title').toggleClass('active').next().slideToggle()
        }


        if ($target[0].closest('.login-btn') && $('body').hasClass("_touch")) {
            e.preventDefault();
            $target.closest('.login-btn').next().toggleClass('visible');
        }

        if ($target.is('.lk__caption-back')) {
            $('.lk__sidebar').addClass('open');
            $('.lk__body').removeClass('active');
        }

        if ($target[0].closest('.sort-btn')) {
            const $dropdown = $target.closest('.dropdown');
            $dropdown.toggleClass('visible')
        }

        if ($target[0].closest('.dropdown__list-item.sort')) {
            const $dropdown = $target.closest('.dropdown');
            const $dropdownText = $dropdown.find('.dropdown__button-text');
            console.log($dropdownText);

            const $listItem = $target.closest('.sort');
            $listItem.addClass('active').siblings().removeClass('active');
            $dropdownText.html($listItem.html())
            $dropdown.removeClass('visible');
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

    if ($('.article__slider').length) {
        new Swiper('.article__slider', {
            slidesPerView: 1,
            speed: 800,
            navigation: {
                nextEl: '.article__next',
                prevEl: '.article__prev',
            }
        });
    }

    if ($('.product__slider-content').length) {
        const productSlider = new Swiper('.product__slider-content', {
            slidesPerView: 1,
            loop: true,
            navigation: {
                nextEl: ".product__slider-next",
                prevEl: ".product__slider-prev",
            }
        })

        const $thumbs = $('.product__thumb');
        if ($thumbs.length) {
            $thumbs.on('click', function () {
                const index = $(this).index();
                productSlider.slideToLoop(index);
                $thumbs.removeClass('active');
                $(this).addClass('active');
            });

            productSlider.on('slideChange', function () {
                const currentIndex = productSlider.realIndex;
                $thumbs.removeClass('active');
                $thumbs.eq(currentIndex).addClass('active');
            });

        }
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


    // Custom Select

    class CustomSelect {

        static openDropdown = null

        constructor(selectElement) {
            this.$select = $(selectElement);
            this.defaultText = this.$select.find('option:selected').text();
            this.selectName = this.$select.attr('name');
            this.$options = this.$select.find('option');
            this.icon = this.$select.data('icon');
            this.title = this.$select.data('title');
            this.$dropdown = null;
            this.initialState = {};
            this.init();
        }

        init() {
            if (!this.$select.length) return;
            this.saveInitialState();
            this.$select.addClass('hidden');
            this.renderDropdown();
            this.setupEvents();
        }

        saveInitialState() {
            const $selectedOption = this.$select.find('option:selected');
            this.initialState = {
                selectedText: $selectedOption.text(),
                selectedValue: $selectedOption.val(),
            };
        }

        renderDropdown() {
            const isDisabled = this.$select.is(':disabled')

            let buttonTemplate = '';

            if (this.icon) {
                buttonTemplate = `
                    <button type="button" class="dropdown__button icon-chevron" 
                        aria-expanded="false" 
                        aria-haspopup="true" 
                        ${isDisabled ? 'disabled' : ''}>
                        <span class="dropdown__button-icon ${this.icon}"></span>
                        <span class="dropdown__button-text">${this.defaultText}</span>
                    </button>
                `;
            } else if (this.title) {

                buttonTemplate = `
                    <button type="button" class="dropdown__button icon-chevron" 
                        aria-expanded="false" 
                        aria-haspopup="true" 
                        ${isDisabled ? 'disabled' : ''}>
                        <span class="dropdown__button-column">
                            <span class="dropdown__button-caption">${this.title}</span>
                            <span class="dropdown__button-text">${this.defaultText}</span>
                        </span>
                    </button>
                `;
            } else {
                buttonTemplate = `
                    <button type="button" class="dropdown__button icon-chevron" 
                        aria-expanded="false" 
                        aria-haspopup="true" 
                        ${isDisabled ? 'disabled' : ''}>
                        <span class="dropdown__button-text">${this.defaultText}</span>
                    </button>
                `;
            }

            this.$dropdown = $(`
                <div class="dropdown">
                    ${buttonTemplate}
                    <div class="dropdown__body" aria-hidden="true">
                        <ul class="dropdown__list" role="listbox"></ul>
                    </div>
                </div>
            `);

            const $list = this.$dropdown.find('.dropdown__list');
            this.$options.each((index, option) => {
                const $option = $(option);
                const value = $option.attr('value');
                const text = $option.text();
                const isSelected = $option.is(':selected');
                const isDisabled = $option.is(':disabled');

                $list.append(`
                    <li role="option"
                        data-value="${value}"
                        aria-checked="${isSelected}"
                        class="dropdown__list-item${isSelected ? ' selected' : ''}${isDisabled ? ' disabled' : ''}" 
                        ${isDisabled ? 'aria-disabled="true"' : ''}>
                        ${text}
                    </li>
                `);
            });

            this.$select.after(this.$dropdown);


        }

        setupEvents() {
            this.$dropdown.find('.dropdown__button').on('click', (event) => {
                event.stopPropagation();
                const isOpen = this.$dropdown.hasClass('visible');
                this.toggleDropdown(!isOpen);
            });

            this.$dropdown.find('.dropdown__list-item').on('click', (event) => {
                event.stopPropagation();
                const $item = $(event.currentTarget);

                if (!$item.hasClass('disabled')) {
                    this.selectOption($item);
                }
            });

            $(document).on('click', () => this.closeDropdown());
            $(document).on('keydown', (event) => {
                if (event.key === 'Escape') this.closeDropdown();
            });

            this.$select.closest('form').on('reset', () => this.restoreInitialState());

            const observerDisabled = new MutationObserver(() => {
                const isSelectDisabled = this.$select.is(':disabled');
                const $button = this.$dropdown.find('.dropdown__button');

                if (isSelectDisabled) {
                    $button.prop('disabled', true);
                } else {
                    $button.prop('disabled', false);
                }
            });

            observerDisabled.observe(this.$select[0], {
                attributes: true,
                attributeFilter: ['disabled']
            });

            const observerSelected = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'disabled') {
                        const $option = $(mutation.target);
                        const value = $option.attr('value');
                        const isDisabled = $option.is(':disabled');
                        const $item = this.$dropdown.find(`.dropdown__list-item[data-value="${value}"]`);

                        $item.toggleClass('disabled', isDisabled);
                        if (isDisabled) {
                            $item.attr('aria-disabled', 'true');
                        } else {
                            $item.removeAttr('aria-disabled');
                        }
                    }

                    if (mutation.type === 'attributes' && mutation.attributeName === 'selected') {
                        this.syncSelectedOption();
                    }
                });
            });

            observerSelected.observe(this.$select[0], {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['selected', 'disabled']
            });
        }

        toggleDropdown(isOpen) {
            if (isOpen && CustomSelect.openDropdown && CustomSelect.openDropdown !== this) {
                CustomSelect.openDropdown.closeDropdown();
            }

            const $body = this.$dropdown.find('.dropdown__body');
            const $list = this.$dropdown.find('.dropdown__list');
            const hasScroll = $list[0].scrollHeight > $list[0].clientHeight;

            this.$dropdown.toggleClass('visible', isOpen);
            this.$dropdown.find('.dropdown__button').attr('aria-expanded', isOpen);
            $body.attr('aria-hidden', !isOpen);

            if (isOpen) {
                CustomSelect.openDropdown = this;
                this.$dropdown.removeClass('dropdown-top');
                const dropdownRect = $body[0].getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                if (dropdownRect.bottom > viewportHeight) {
                    this.$dropdown.addClass('dropdown-top');
                }

                $list.toggleClass('has-scroll', hasScroll);
            } else {
                if (CustomSelect.openDropdown === this) {
                    CustomSelect.openDropdown = null;
                }
            }
        }

        closeDropdown() {
            this.toggleDropdown(false);
        }

        selectOption($item) {
            const value = $item.data('value');
            const text = $item.text();

            this.$dropdown.find('.dropdown__list-item').removeClass('selected').attr('aria-checked', 'false');
            $item.addClass('selected').attr('aria-checked', 'true');

            this.$dropdown.find('.dropdown__button-text').text(text);
            this.$select.val(value).trigger('change');
            this.closeDropdown();
        }

        restoreInitialState() {
            const state = this.initialState;
            this.$select.val(state.selectedValue).trigger('change');
            this.$dropdown.find('.dropdown__list-item').removeClass('selected').attr('aria-checked', 'false');
            this.$dropdown
                .find(`.dropdown__list-item[data-value="${state.selectedValue}"]`)
                .addClass('selected')
                .attr('aria-checked', 'true');
            this.$dropdown.find('.dropdown__button-text').text(state.selectedText);
        }

        syncSelectedOption() {
            const $selectedOption = this.$select.find('option:selected');
            const selectedValue = $selectedOption.val();
            const selectedText = $selectedOption.text();


            this.$dropdown.find('.dropdown__list-item').removeClass('selected').attr('aria-checked', 'false');
            this.$dropdown
                .find(`.dropdown__list-item[data-value="${selectedValue}"]`)
                .addClass('selected')
                .attr('aria-checked', 'true');
            this.$dropdown.find('.dropdown__button-text').text(selectedText);
        }
    }


    $('.select').each((index, element) => {
        new CustomSelect(element);
    });


    // international phone input
    if ($('.phone-input').length > 0) {
        $('.phone-input').each(function (idx, input) {

            let inputInt = intlTelInput(input, {
                utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
                initialCountry: "ru",
                separateDialCode: true,
            });

            let pattern = getPattern();


            input.addEventListener("countrychange", function () {
                pattern = getPattern();
                $(input).formatter().resetPattern(pattern);
            });

            $(input).formatter({
                'pattern': pattern
            });

            function getPattern() {
                let pattern;
                if (inputInt.j == 'ru') {
                    pattern = '({{999}}) {{999}}-{{99}}-{{99}}';
                } else {
                    pattern = '{{9999999999999999999999}}';
                }

                return pattern;
            }
        });
    }


    // confirmation sms


    if ($('.code').length > 0) {
        const $inputs = $('.code__input');
        const KEYBOARDS = {
            backspace: 8,
            arrowLeft: 37,
            arrowRight: 39,
        };

        function handleInput(e) {
            const $input = $(e.target);
            const $nextInput = $input.next('.code__input');
            if ($nextInput.length && $input.val()) {
                $nextInput.focus();
                if ($nextInput.val()) {
                    $nextInput.select();
                }
            }
        }

        function handlePaste(e) {
            e.preventDefault();
            const paste = e.originalEvent.clipboardData.getData('text');
            $inputs.each((i, input) => {
                $(input).val(paste[i] || '');
            });
        }

        function handleBackspace(e) {
            const $input = $(e.target);
            if ($input.val()) {
                $input.val('');
                return;
            }
            const $prevInput = $input.prev('.code__input');
            if ($prevInput.length) {
                $prevInput.focus();
            }
        }

        function handleArrowLeft(e) {
            const $prevInput = $(e.target).prev('.code__input');
            if ($prevInput.length) {
                $prevInput.focus();
            }
        }

        function handleArrowRight(e) {
            const $nextInput = $(e.target).next('.code__input');
            if ($nextInput.length) {
                $nextInput.focus();
            }
        }

        $('.code').on('input', '.code__input', handleInput);

        $inputs.first().on('paste', handlePaste);

        $inputs.on('focus', function () {
            const $input = $(this);
            setTimeout(() => {
                $input.select();
            }, 0);
        });

        $inputs.on('keydown', function (e) {
            switch (e.keyCode) {
                case KEYBOARDS.backspace:
                    handleBackspace(e);
                    break;
                case KEYBOARDS.arrowLeft:
                    handleArrowLeft(e);
                    break;
                case KEYBOARDS.arrowRight:
                    handleArrowRight(e);
                    break;
                default:
            }
        });
    }



})





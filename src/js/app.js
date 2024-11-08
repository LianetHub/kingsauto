"use strict";


import * as devFunctions from './modules/functions.js';

//  init Fancybox
if (typeof Fancybox !== "undefined" && Fancybox !== null) {
    Fancybox.bind("[data-fancybox]", {
        dragToClose: false,
        closeButton: false
    });
}

document.addEventListener('DOMContentLoaded', () => {

    devFunctions.OS();
    devFunctions.isWebp();


    // event handlers

    document.addEventListener('click', (e) => {

        const target = e.target;

        if (target.closest('.menu__btn')) {
            getMenu()
        }

        if (target.classList.contains('menu__arrow')) {

            let subMenu = target.nextElementSibling;

            if (document.querySelector('.menu__arrow.active') !== target) {

                if (document.querySelector('.submenu.open')) {
                    document.querySelector('.submenu.open').classList.remove('open');
                }
                if (document.querySelector('.menu__arrow.active')) {
                    document.querySelector('.menu__arrow.active').classList.remove('active');
                }

            }

            subMenu.classList.toggle('open');
            target.classList.toggle('active');

        }

    });

    function getMenu() {
        document.body.classList.toggle('lock');
        document.querySelector('.header').classList.toggle('open-menu');
    }

    //  sliders


    if (document.querySelector('.promo__slider')) {

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

                    document.querySelector('.promo__pagination').style.setProperty('--counting-speed', ((speed + autoplaySpeed) / 1000) + "s");
                }
            }
        })
    }

    document.querySelectorAll('.selections__slider')?.forEach(selectionsSlider => {

        const slider = selectionsSlider.querySelector('.swiper');
        const prevBtn = selectionsSlider.querySelector('.selections__prev');
        const nextBtn = selectionsSlider.querySelector('.selections__next');
        const pagintionBlock = selectionsSlider.querySelector('.selections__pagination');

        new Swiper(slider, {
            speed: 800,
            slidesPerView: "auto",
            spaceBetween: 20,
            navigation: {
                nextEl: nextBtn,
                prevEl: prevBtn
            },
            pagination: {
                el: pagintionBlock,
                clickable: true
            },
            breakpoints: {
                767.98: {
                    slidesPerView: 3,
                }
            }
        })
    })

    document.querySelectorAll('.auto-card__slider')?.forEach(autoImagesSlider => {

        const pagintionBlock = autoImagesSlider.querySelector('.auto-card__slider-pagination');

        new Swiper(autoImagesSlider, {
            speed: 800,
            slidesPerView: 1,
            pagination: {
                el: pagintionBlock,
                clickable: true
            },
        })
    })


    const headerElement = document.querySelector('.header');

    const callback = function (entries, observer) {
        if (entries[0].isIntersecting) {
            headerElement.classList.remove('scroll');
        } else {
            headerElement.classList.add('scroll');
        }
    };

    const headerObserver = new IntersectionObserver(callback);
    headerObserver.observe(headerElement);


    // tabs

    class Tabs {
        constructor(wrapper) {
            this.wrapper = wrapper;
            this.tabButtons = this.wrapper.querySelectorAll('.tabs__item');
            this.tabContents = this.wrapper.querySelectorAll('.tab-content');
            this.init();
        }

        init() {
            this.tabButtons.forEach((button, index) => {
                button.addEventListener('click', () => this.activateTab(index));
            });
        }

        activateTab(index) {

            this.tabButtons.forEach(button => button.classList.remove('active'));
            this.tabContents.forEach(content => content.classList.remove('active'));


            this.tabButtons[index].classList.add('active');
            this.tabContents[index].classList.add('active');
        }
    }


    document.querySelectorAll('.tabs-wrapper')?.forEach(wrapper => new Tabs(wrapper));



})





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

    if (document.querySelector('.selections__slider')) {

        new Swiper('.selections__slider .swiper', {
            speed: 800,
            slidesPerView: "auto",
            spaceBetween: 20,
            navigation: {
                nextEl: '.selections__next',
                prevEl: '.selections__prev'
            },
            pagination: {
                el: ".selections__pagination",
                clickable: true
            },
            breakpoints: {
                767.98: {
                    slidesPerView: 3,
                }
            }
        })
    }







})





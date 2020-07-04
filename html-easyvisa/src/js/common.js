(function () {
    AOS.init({
        once: true
    });
    document.addEventListener("load", AOS.refresh());


    if (Boolean(document.querySelector('[data-js=waterfall]'))) {
        imagesLoaded(document.querySelector('[data-js=waterfall]'), function (instance) {
            // all images are loaded
            waterfall('[data-js=waterfall]')
        });

        window.addEventListener('resize', function () {
            waterfall('[data-js=waterfall]');
        });
    }

    if (Boolean(document.querySelector('[data-js=select-type-1]'))) {
        document.querySelectorAll('[data-js=select-type-1]').forEach(select => {
            easydropdown(select)
        })
    }

    if (Boolean(document.querySelector('[data-js=select-type-2]'))) {
        document.querySelectorAll('[data-js=select-type-2]').forEach(select => {
            easydropdown(select, {
                callbacks: {
                    onSelect: value => console.log(value)
                }
            })
        })
    }

    if (Boolean(document.querySelector('[data-js=select-type-3]'))) {
        document.querySelectorAll('[data-js=select-type-3]').forEach(select => {
            easydropdown(select, {
                callbacks: {
                    onSelect: value => console.log(value)
                }
            })
        })
    }


    if (Boolean(document.querySelector('[data-js=slider-index-page-popular-destinations]'))) {
        tns({
            container: document.querySelector('[data-js=slider-index-page-popular-destinations]'),
            controlsText: ["", ""],
            rewind: true,
            loop: false,
            mouseDrag: true,
            navPosition: "bottom",
            gutter: 15,
            responsive: {
                1050: {
                    items: 4,
                    slideBy: 4,
                    gutter: 20,
                },
                750: {
                    items: 3,
                    slideBy: 3,
                },
                500: {
                    items: 2,
                    slideBy: 2,
                },
            }
        });
    }


    if (Boolean(document.querySelector('[data-js=slider-type-1]'))) {
        document.querySelectorAll('[data-js=slider-type-1]').forEach(slider => {
            tns({
                container: slider,
                items: 1,
                slideBy: 1,
                gutter: 15,
                navPosition: "bottom",
                controlsText: ["", ""],
                mouseDrag: true,
                rewind: true,
                loop: false,
                responsive: {
                    1050: {
                        gutter: 20,
                    },
                    850: {
                        items: 4,
                        slideBy: 4,
                    },
                    550: {
                        items: 3,
                        slideBy: 3,
                    },
                    360: {
                        items: 2,
                        slideBy: 2,
                    },
                }
            });
        })
    }

    if (Boolean(document.querySelector('[data-js=slider-type-4]'))) {
        document.querySelectorAll('[data-js=slider-type-4]').forEach(slider => {
            tns({
                container: slider,
                items: 1,
                slideBy: 1,
                gutter: 15,
                navPosition: "bottom",
                nav: true,
                controlsText: ["", ""],
                mouseDrag: true,
                rewind: true,
                loop: false,
                responsive: {
                    1450: {
                        nav: false
                    },
                    800: {
                        items: 3,
                        slideBy: 3,
                        gutter: 20,
                    },
                    500: {
                        items: 2,
                        slideBy: 2,
                    },
                }
            });
        })
    }

    if (Boolean(document.querySelector('[data-js=slider-type-2]'))) {
        if (window.innerWidth > 600) {  // no switching modes via 'responsive' attribute of tns
            document.querySelectorAll('[data-js=slider-type-2]').forEach(slider => {
                slider_type_2 = tns({
                    container: slider,
                    controlsText: ["", ""],
                    navPosition: "bottom",
                    rewind: true,
                    loop: false,
                    mode: 'gallery',
                });
            })
        } else {
            document.querySelectorAll('[data-js=slider-type-2]').forEach(slider => {
                slider_type_2 = tns({
                    container: slider,
                    controlsText: ["", ""],
                    navPosition: "bottom",
                    gutter: 60,
                    mouseDrag: true,
                    rewind: true,
                    loop: false,
                });
            })
        }
        // got glitches using following with AOS lib.
        // let slider_type_2 = init_slider_type_2();
        // let new_slider_type_2 = false;
        // window.addEventListener("resize", e => {
        //     if (slider_type_2) {
        //         slider_type_2.destroy();
        //         slider_type_2 = false;
        //     }
        //     if (!(new_slider_type_2)) {
        //         new_slider_type_2 = init_slider_type_2();
        //     } else {
        //         new_slider_type_2.destroy();
        //         new_slider_type_2 = init_slider_type_2();
        //     }
        // });
        //
        // function init_slider_type_2() {
        //     let slider_type_2;
        //     if (window.innerWidth > 600) {  // no switching modes via 'responsive' attribute of tns
        //         document.querySelectorAll('[data-js=slider-type-2]').forEach(slider => {
        //             slider_type_2 = tns({
        //                 container: slider,
        //                 controlsText: ["", ""],
        //                 navPosition: "bottom",
        //                 rewind: true,
        //                 loop: false,
        //                 mode: 'gallery',
        //             });
        //         })
        //     } else {
        //         document.querySelectorAll('[data-js=slider-type-2]').forEach(slider => {
        //             slider_type_2 = tns({
        //                 container: slider,
        //                 controlsText: ["", ""],
        //                 navPosition: "bottom",
        //                 gutter: 60,
        //                 mouseDrag: true,
        //                 rewind: true,
        //                 loop: false,
        //             });
        //         })
        //     }
        //     return slider_type_2
        // }
    }

    if (Boolean(document.querySelector('[data-js=slider-type-3]'))) {
        document.querySelectorAll('[data-js=slider-type-3]').forEach(slider => {
            tns({
                container: slider,
                controlsText: ["", ""],
                nav: false,
                items: 1,
                slideBy: 1,
                rewind: true,
                loop: false,
                mouseDrag: true,
                gutter: 15,
                preventScrollOnTouch: 'auto',

                responsive: {
                    1400: {
                        items: 3,
                        slideBy: 1,
                    },
                    1050: {
                        items: 3.2,
                        slideBy: 1,
                        gutter: 20,
                    },
                    700: {
                        items: 2.2,
                        slideBy: 1,
                    },
                    550: {
                        items: 2,
                        slideBy: 1,
                    },
                }
            });
        })
    }

    if (Boolean(document.querySelector('[data-js=slider-type-5]'))) {
        document.querySelectorAll('[data-js=slider-type-5]').forEach(slider => {
            tns({
                container: slider,
                items: 1,
                slideBy: 1,
                gutter: 20,
                navPosition: "bottom",
                controlsText: ["", ""],
                mouseDrag: true,
                rewind: true,
                loop: false,
                nav: false,
                responsive: {
                    1450: {
                        nav: false,
                        gutter: 60,
                    },
                    1100: {
                        items: 2,
                        slideBy: 1,
                    },
                    1050: {
                        gutter: 40,
                    },
                    800: {
                        items: 1.2,
                        slideBy: 1,
                        gutter: 30,
                    },
                    600: {
                        nav: true,
                    }
                }
            });
        })
    }

    if (Boolean(document.querySelector('[data-js=slider-type-6]'))) {
        document.querySelectorAll('[data-js=slider-type-6]').forEach(slider => {
            let slider_type_6 = tns({
                container: slider,
                items: 1,
                slideBy: 1,
                gutter: 50,
                navPosition: "bottom",
                controlsText: ["", ""],
                mouseDrag: true,
                rewind: true,
                loop: false,
                autoHeight: true
            });

            // following doesn't really work. It's not updating.
            // Though if call slider_type_6.updateSliderHeight() in the console then it works. ¯\_(ツ)_/¯
            slider.querySelectorAll("[data-js=show-more__btn]").forEach(btn => {
                btn.addEventListener("click", e => {
                    // let show_more_content = btn.closest("[data-js=show-more]").querySelector("[data-js=show-more__content]");

                    setTimeout(function () {
                        slider_type_6.updateSliderHeight();
                    }, 0);
                    // let isTransitioning = true;
                    // let counter = 0;
                    // while (isTransitioning) {
                    //     console.log("isTransitioning");
                    //     slider_type_6.updateSliderHeight();
                    //     show_more_content.addEventListener("transitionend", e => {
                    //         isTransitioning = false;
                    //         slider_type_6.updateSliderHeight();
                    //     });
                    //     counter += 1;
                    //     if (counter > 3100) {
                    //         console.log(counter);
                    //         isTransitioning = false;
                    //     }
                    // }
                })
            })
        })
    }

    if (window.innerWidth < 851) {
        if (Boolean(document.querySelector('[data-js=slider-type-7]'))) {
            document.querySelectorAll('[data-js=slider-type-7]').forEach(slider => {
                let wrap_class = slider.getAttribute("data-slider-wrap-children-class");
                if (wrap_class) {
                    wrap_slider_children(slider, wrap_class, function () {
                            tns({
                                container: slider,
                                items: 2,
                                slideBy: 2,
                                gutter: 15,
                                navPosition: "bottom",
                                mouseDrag: true,
                                rewind: true,
                                loop: false,
                                controls: false,
                                autoHeight: true,
                                responsive: {
                                    700: {
                                        items: 3,
                                        slideBy: 3,
                                    },
                                    400: {
                                        gutter: 20,
                                    },
                                }
                            });
                        }
                    )
                }
            })
        }

        if (Boolean(document.querySelector('[data-js=slider-type-8]'))) {
            document.querySelectorAll('[data-js=slider-type-8]').forEach(slider => {
                let wrap_class = slider.getAttribute("data-slider-wrap-children-class");
                if (wrap_class) {
                    wrap_slider_children(slider, wrap_class, function () {
                            tns({
                                container: slider,
                                items: 1,
                                slideBy: 1,
                                gutter: 15,
                                navPosition: "bottom",
                                mouseDrag: true,
                                rewind: true,
                                loop: false,
                                controls: false,
                                responsive: {
                                    500: {
                                        items: 2,
                                        slideBy: 2,
                                    },
                                }
                            });
                        }
                    )
                }
            })
        }
    }

    if (Boolean(document.querySelector('[data-js=foreign-passport-page-features-section__btn]'))) {
        let foreign_passport_page_features_section_btn = document.querySelector('[data-js=foreign-passport-page-features-section__btn]');
        let foreign_passport_page_features_section_hidden_box = document.querySelector('[data-js=foreign-passport-page-features-section__hidden-box]');
        foreign_passport_page_features_section_btn
            .addEventListener("click", e => {
                foreign_passport_page_features_section_btn
                    .classList.toggle("foreign-passport-page-features-section__btn_active");

                foreign_passport_page_features_section_hidden_box
                    .classList.toggle("foreign-passport-page-features-section__box_hidden");
            });
    }

    if (Boolean(document.querySelector('[data-js=datepicker]'))) {
        let datepicker_input = document.querySelector('[data-js=datepicker]');
        let datepicker_input_container = document.querySelector('[data-js=datepicker-container]');
        let datepicker_arrow = document.querySelector('[data-js=datepicker-arrow]');
        let datepicker = new HotelDatepicker(datepicker_input, {
            format: 'DD.MM.YYYY',
            startOfWeek: 'monday',
            i18n: {
                selected: 'Дата поездки (с и до):',
                night: 'Сутки',
                nights: 'Суток',
                button: 'Закрыть',
                'checkin-disabled': 'Check-in недоступен',
                'checkout-disabled': 'Check-out недоступен',
                'day-names-short': ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                'day-names': ['Воскресенье ', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
                'month-names-short': ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
                'month-names': ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                'error-more': 'L\'Диапазон дат должен быть не более 1 суток',
                'error-more-plural': 'L\'Диапазон дат должен быть не более %d суток',
                'error-less': 'L\'диапазон дат должен быть не менее 1 суток',
                'error-less-plural': 'L\'Диапазон дат должен быть не менее %d суток',
                'info-more': 'Пожалуйста, выберите диапазон дат больше 1 суток',
                'info-more-plural': 'Пожалуйста, выберите диапазон дат больше %d суток',
                'info-range': 'Пожалуйста, выберите диапазон дат между %d и % D суток',
                'info-default': 'Пожалуйста, выберите диапазон дат'
            },
            separator: ' ‒ ',
            animationSpeed: ".3s",
            onOpenDatepicker: function () {
                datepicker_input.closest('[data-js=datepicker-container]').classList.add("datepicker-container_opened");
            }
        });

        datepicker_arrow.addEventListener("click", e => {
            datepicker.open();
        });

        datepicker_input.addEventListener('afterClose', function () {
            datepicker_input_container.classList.remove("datepicker-container_opened");
        }, false);
    }
}());
function removeInnerHtml(elem) {
    while (elem.firstChild) elem.removeChild(elem.firstChild);
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

let csrftoken = getCookie('csrftoken');
let map_n_contact__map;
let myPlacemark;
if (Boolean(document.querySelector('#map-n-contact__map-container'))) {
    let placemark_name = document.querySelector('#map-n-contact__map-container').getAttribute("data-map-placemark");
    let coordinates = document.querySelector('[data-map-coordinates]').getAttribute("data-map-coordinates").split`,`.map(x => +x);
    let address = document.querySelector('[data-map-address]').getAttribute("data-map-address");
    let hint = document.querySelector('[data-map-hint]').getAttribute("data-map-hint");
    ymaps.ready(function (e) {
        let iconSize = [123, 164];
        let iconImageOffset = [-62, -164];
        let zoomLevel = 16;
        if (window.innerWidth < 1050) {
            iconSize = [83, 114];
            iconImageOffset = [-42, -114];
        }
        map_n_contact__map = new ymaps.Map('map-n-contact__map-container', {
            center: coordinates,
            zoom: zoomLevel,
        }, {}), myPlacemark = new ymaps.Placemark(coordinates, {
            hintContent: hint,
            balloonContent: address
        }, {
            iconLayout: 'default#image',
            iconImageHref: placemark_name,
            iconImageSize: iconSize,
            iconImageOffset: iconImageOffset
        });
        map_n_contact__map.geoObjects.add(myPlacemark);
        // map_n_contact__map.controls.remove('zoomControl');
        map_n_contact__map.controls.remove('geolocationControl');
        map_n_contact__map.controls.remove('searchControl');
        map_n_contact__map.controls.remove('trafficControl');
        map_n_contact__map.controls.remove('typeSelector');
        map_n_contact__map.controls.remove('fullscreenControl');
        map_n_contact__map.controls.remove('rulerControl');
    });
}
(function () {
    AOS.init({once: true});
    document.addEventListener("load", AOS.refresh());
    if (Boolean(document.querySelector('[data-js=waterfall]'))) {
        imagesLoaded(document.querySelector('[data-js=waterfall]'), function (instance) {
            waterfall('[data-js=waterfall]')
        });
        window.addEventListener('resize', function () {
            waterfall('[data-js=waterfall]');
        });
    }
    let branch_selects = document.querySelectorAll('[data-js=select-type-1]');
    let branch_select_value = branch_selects[0].value;
    branch_selects.forEach(select => {
        easydropdown(select, {
            callbacks: {
                onSelect: value => {
                    if (value !== branch_select_value) {
                        branch_select_value = value;
                        getAjax(`/branch/get_branch/${value}/`, function (data) {
                            let branch = JSON.parse(data);
                            update_branch(branch);
                        }, function (data) {
                            document.querySelector("[data-popbox-id=popbox-result] .title__text").innerHTML = 'Ошибка! Пожалуйста, перезагрузите страницу и попробуйте отправить запрос снова.';
                            popbox.open("popbox-result")
                        });
                        branch_selects.forEach(select => {
                            select.value = value
                        });
                    }
                }
            }
        })
    });

    function update_branch(branch) {
        update_branch_phones(branch);
        update_branch_socials(branch);
        if (Boolean(document.querySelector('[data-branch=phone2-holder-list]'))) {
            update_branch_address_n_work_hours_n_email(branch);
            update_map(branch.coordinates, branch.address, `EASYVISA AGENCY<br>${branch.city}`);
            document.querySelector('[data-branch=title]').innerText = branch.city;
            update_branch_url(branch);
        }
    }

    function update_map(coordinates, address, hint) {
        let placemark = document.querySelector("#map-n-contact__map-container").getAttribute("data-map-placemark");
        let iconSize = [123, 164];
        let iconImageOffset = [-62, -164];
        if (window.innerWidth < 1050) {
            iconSize = [83, 114];
            iconImageOffset = [-42, -114];
        }
        let myNewPlacemark = new ymaps.Placemark(coordinates, {
            hintContent: hint,
            balloonContent: address,
        }, {
            iconLayout: 'default#image',
            iconImageHref: placemark,
            iconImageSize: iconSize,
            iconImageOffset: iconImageOffset
        });
        map_n_contact__map.container.fitToViewport();
        map_n_contact__map.panTo([coordinates], {flying: 1}).then(() => {
            map_n_contact__map.geoObjects.removeAll();
            map_n_contact__map.geoObjects.add(myNewPlacemark);
        });
    }

    function update_branch_address_n_work_hours_n_email(branch) {
        document.querySelector("[data-branch=address").innerHTML = branch.address;
        document.querySelector("[data-branch=work-hours").innerHTML = branch.work_hours;
        if (branch.email) {
            if (Boolean(document.querySelector('[data-branch=email]'))) {
                document.querySelector("[data-branch=email").innerHTML = branch.email;
            } else {
                let prev_elem = document.querySelector("[data-branch=phone2-holder-list]").closest('.contact-name-n-value');
                let email_holder = `<div class="contact-name-n-value"data-branch="email-holder-list"><div class="contact-name-n-value__name">E-mail:</div><a class="contact-name-n-value__value"data-branch="email"href="mailto:${branch.email}">${branch.email}</a></div>`;
                prev_elem.insertAdjacentHTML("afterend", email_holder)
            }
        } else {
            if (Boolean(document.querySelector('[data-branch=email-holder-list]'))) {
                document.querySelector("[data-branch=email-holder-list]").remove()
            }
        }
    }

    function update_branch_url(branch) {
        document.querySelectorAll("[data-branch=url]").forEach(url => {
            url.setAttribute("href", `/contact/${branch.slug}/`)
        });
        window.history.pushState(null, '', `/contact/${branch.slug}/`);
    }

    window.onpopstate = () => {
        window.location.reload()
    };

    function update_branch_phones(branch) {
        document.querySelectorAll("[data-branch=phone]").forEach(phone => {
            phone.querySelector(".contact-card__text").innerText = branch.phone[0];
            phone.setAttribute("href", `tel:${branch.phone[0]}`)
        });
        if (Boolean(document.querySelector('[data-branch=phone2-holder-list]'))) {
            let phone2_holder_list = document.querySelector("[data-branch=phone2-holder-list]");
            removeInnerHtml(phone2_holder_list);
            branch.phone.forEach(phone => {
                let phone_holder = `<a class="contact-name-n-value__value contact-name-n-value__value_phone"data-branch="phone2"href="tel: ${phone}">${phone}</a>`;
                phone2_holder_list.insertAdjacentHTML("beforeend", phone_holder);
            })
        }
    }

    function update_branch_socials(branch) {
        if (branch.whatsapp) {
            if (document.querySelector("[data-branch=whatsapp]")) {
                document.querySelectorAll("[data-branch=whatsapp]").forEach(whatsapp_holder => {
                    whatsapp_holder.setAttribute("href", branch.whatsapp)
                });
            } else {
                document.querySelectorAll("[data-branch=instagram]").forEach(instagram => {
                    let whatsapp_holder = `<a class="social__item"data-branch="whatsapp"href="${branch.whatsapp}"><div class="icon icon_whatsapp"></div></a>`;
                    instagram.insertAdjacentHTML('beforebegin', whatsapp_holder)
                });
            }
        } else {
            document.querySelectorAll("[data-branch=whatsapp]").forEach(whatsapp_holder => {
                whatsapp_holder.remove()
            });
        }
        document.querySelectorAll("[data-branch=instagram]").forEach(instagram => {
            instagram.setAttribute("href", branch.instagram_link)
        });
        if (branch.vk) {
            if (document.querySelector("[data-branch=vk]")) {
                document.querySelectorAll("[data-branch=vk]").forEach(vk_holder => {
                    vk_holder.setAttribute("href", branch.vk)
                });
            } else {
                document.querySelectorAll("[data-branch=instagram]").forEach(instagram => {
                    let vk_holder = `<a class="social__item"data-branch="vk"href="${branch.vk}"><div class="icon icon_vk"></div></a>`;
                    instagram.insertAdjacentHTML('afterend', vk_holder)
                });
            }
        } else {
            document.querySelectorAll("[data-branch=vk]").forEach(vk_holder => {
                vk_holder.remove()
            });
        }
    }

    if (Boolean(document.querySelector('[data-js=select-type-2]'))) {
        let representative_select = document.querySelector('[data-js=select-type-2]');
        easydropdown(representative_select, {
            callbacks: {
                onSelect: value => {
                    getAjax(`/visa/get_visa_representative/${value}/`, function (data) {
                        let visa_representative = JSON.parse(data);
                        update_visa_representative(visa_representative);
                    }, function (data) {
                        document.querySelector("[data-popbox-id=popbox-result] .title__text").innerHTML = 'Ошибка! Пожалуйста, перезагрузите страницу и попробуйте отправить запрос снова.';
                        popbox.open("popbox-result")
                    });
                }
            }
        })
    }

    function update_visa_representative(data) {
        document.querySelector("[data-visa-representative=address").innerHTML = data.address;
        update_visa_representative_phones(data);
        update_visa_representative_email(data);
        update_visa_representative_website(data);
        update_map(data.coordinates, data.address, `Представитель ${data.country}<br>${data.city}`, 'placemark-2.png');
    }

    function update_visa_representative_phones(data) {
        let phone_holder_list = document.querySelector("[data-visa-representative=phone-holder-list]");
        removeInnerHtml(phone_holder_list);
        data.phone.forEach(phone => {
            let phone_holder = `<a class="contact-name-n-value__value contact-name-n-value__value_phone"data-visa-representative="phone"href="tel: ${phone}">${phone}</a>`;
            phone_holder_list.insertAdjacentHTML("beforeend", phone_holder);
        })
    }

    function update_visa_representative_email(data) {
        if (data.email) {
            if (Boolean(document.querySelector('[data-visa-representative=email]'))) {
                document.querySelector("[data-visa-representative=email").innerHTML = data.email;
            } else {
                let phone_holder_list = document.querySelector("[data-visa-representative=phone-holder-list]");
                let email_holder = `<div class="contact-name-n-value"data-visa-representative="email-holder-list"><div class="contact-name-n-value__name">E-mail:</div><a class="contact-name-n-value__value"data-visa-representative="email"href="mailto:${data.email}">${data.email}</a></div>`;
                phone_holder_list.insertAdjacentHTML("afterend", email_holder)
            }
        } else {
            if (Boolean(document.querySelector('[data-visa-representative=email-holder-list]'))) {
                document.querySelector("[data-visa-representative=email-holder-list]").remove()
            }
        }
    }

    function update_visa_representative_website(data) {
        if (data.website) {
            if (Boolean(document.querySelector('[data-visa-representative=website]'))) {
                document.querySelector("[data-visa-representative=website").innerHTML = data.website;
            } else {
                let website_holder = `<div class="contact-name-n-value"data-visa-representative="website-holder-list"><div class="contact-name-n-value__name">Сайт:</div><a class="contact-name-n-value__value"target="_blank"data-visa-representative="website"href="https://${data.website}">${data.website}</a></div>`;
                if (Boolean(document.querySelector('[data-visa-representative=email]'))) {
                    let prev_elem = document.querySelector('[data-visa-representative=email-holder-list]').closest('.contact-name-n-value');
                    prev_elem.insertAdjacentHTML("afterend", website_holder)
                } else {
                    let prev_elem = document.querySelector("[data-visa-representative=phone-holder-list]").closest('.contact-name-n-value');
                    prev_elem.insertAdjacentHTML("afterend", website_holder)
                }
            }
        } else {
            if (Boolean(document.querySelector('[data-visa-representative=website-holder-list]'))) {
                document.querySelector("[data-visa-representative=website-holder-list]").remove()
            }
        }
    }

    if (Boolean(document.querySelector('[data-js=select-type-3]'))) {
        let document_select = document.querySelector('[data-js=select-type-3]');
        easydropdown(document_select, {
            callbacks: {
                onSelect: value => {
                    let person = document_select.options[document_select.selectedIndex].text;
                    let person_holder = document.querySelector("[data-visa-document=person]");
                    person_holder.innerText = person;
                    getAjax(`/visa/get_visa_documents/${value}/`, function (data) {
                        let visa_documents = JSON.parse(data);
                        update_visa_documents(visa_documents);
                    }, function (data) {
                        document.querySelector("[data-popbox-id=popbox-result] .title__text").innerHTML = 'Ошибка! Пожалуйста, перезагрузите страницу и попробуйте отправить запрос снова.';
                        popbox.open("popbox-result")
                    });
                }
            }
        })
    }

    function update_visa_documents(visa_documents) {
        let counter = 1;
        let document_holder_list = document.querySelector("[data-visa-document=documents]");
        removeInnerHtml(document_holder_list);
        visa_documents.forEach(document => {
            let document_holder = `<div class="doc-list__item doc"><div class="doc__counter-n-title"><div class="doc__counter">${counter}</div><div class="doc__title">${document.document_title}</div></div><div class="doc__text">${document.description}</div></div>`;
            document_holder_list.insertAdjacentHTML("beforeend", document_holder);
            counter += 1;
        })
    }

    if (Boolean(document.querySelector('[data-js=select-type-4]'))) {
        document.querySelectorAll('[data-js=select-type-4]').forEach(select => {
            easydropdown(select)
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
                1050: {items: 4, slideBy: 4, gutter: 20,},
                750: {items: 3, slideBy: 3,},
                500: {items: 2, slideBy: 2,},
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
                    1050: {gutter: 20,},
                    850: {items: 4, slideBy: 4,},
                    550: {items: 3, slideBy: 3,},
                    360: {items: 2, slideBy: 2,},
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
                    1450: {nav: false},
                    800: {items: 3, slideBy: 3, gutter: 20,},
                    500: {items: 2, slideBy: 2,},
                }
            });
        })
    }
    if (Boolean(document.querySelector('[data-js=slider-type-2]'))) {
        if (window.innerWidth > 600) {
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
    }
    if (Boolean(document.querySelector('[data-js=slider-type-3]'))) {
        document.querySelectorAll('[data-js=slider-type-3]').forEach(slider => {
            tns({
                container: slider,
                controlsText: ["", ""],
                navPosition: "bottom",
                items: 1,
                slideBy: 1,
                rewind: true,
                loop: false,
                mouseDrag: true,
                gutter: 15,
                preventScrollOnTouch: 'auto',
                responsive: {
                    1400: {items: 3, slideBy: 1,},
                    1050: {items: 3.2, slideBy: 1, gutter: 20,},
                    700: {items: 2.2, slideBy: 1,},
                    550: {items: 2, slideBy: 1,},
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
                    1450: {nav: false, gutter: 60,},
                    1100: {items: 2, slideBy: 1,},
                    1050: {gutter: 40,},
                    800: {items: 1.2, slideBy: 1, gutter: 30,},
                    600: {nav: true,}
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
            slider.querySelectorAll("[data-js=show-more__btn]").forEach(btn => {
                btn.addEventListener("click", e => {
                    setTimeout(function () {
                        slider_type_6.updateSliderHeight();
                    }, 0);
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
                            responsive: {700: {items: 3, slideBy: 3,}, 400: {gutter: 20,},}
                        });
                    })
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
                            responsive: {500: {items: 2, slideBy: 2,},}
                        });
                    })
                }
            })
        }
    }
    if (Boolean(document.querySelector('[data-js=foreign-passport-page-features-section__btn]'))) {
        let foreign_passport_page_features_section_btn = document.querySelector('[data-js=foreign-passport-page-features-section__btn]');
        let foreign_passport_page_features_section_hidden_box = document.querySelector('[data-js=foreign-passport-page-features-section__hidden-box]');
        foreign_passport_page_features_section_btn.addEventListener("click", e => {
            foreign_passport_page_features_section_btn.classList.toggle("foreign-passport-page-features-section__btn_active");
            foreign_passport_page_features_section_hidden_box.classList.toggle("foreign-passport-page-features-section__box_hidden");
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
let popbox = new Popbox();
(function () {
    document.querySelectorAll("[data-form-note-filler]").forEach(btn => {
        btn.addEventListener("click", () => {
            let note = btn.getAttribute('data-form-note-filler');
            let form = document.querySelector("[data-popbox-id=popbox-callback] form");
            form.setAttribute("data-form-note", note)
        });
    });
    document.querySelectorAll("[data-js=form]").forEach(form => {
        form.addEventListener("submit", e => {
            e.preventDefault();
            let name_value, phone_value, email_value, city_value, destination_value, n_of_passengers_value, date_value,
                how_old_value, question_value, feedback_value;
            name_value = phone_value = email_value = city_value = destination_value = n_of_passengers_value = date_value = how_old_value = question_value = feedback_value = "—";
            let is_name_valid, is_phone_valid, is_email_valid, is_city_valid, is_destination_valid,
                is_n_of_passengers_valid, is_date_valid, is_how_old_valid, is_question_valid, is_feedback_valid,
                is_checkbox_valid;
            is_name_valid = is_phone_valid = is_email_valid = is_city_valid = is_destination_valid = is_n_of_passengers_valid = is_date_valid = is_how_old_valid = is_question_valid = is_feedback_valid = is_checkbox_valid = true;
            let note_value = form.getAttribute("data-form-note");
            let name_input = form.querySelector("input[name=name]");
            let phone_input = form.querySelector("input[name=phone]");
            let email_input = form.querySelector("input[name=email]");
            let city_input = form.querySelector("input[name=city]");
            let destination_select = form.querySelector("select[name=destination]");
            let destination_input = form.querySelector("input[name=destination]");
            let n_of_passengers_select = form.querySelector("select[name=n_of_passengers]");
            let date_input = form.querySelector("input[name=date]");
            let how_old_select = form.querySelector("select[name=how_old]");
            let question_input = form.querySelector("textarea[name=question]");
            let feedback_input = form.querySelector("textarea[name=feedback]");
            let checkbox_input = form.querySelector("input[name=checkbox]");
            if (name_input) {
                name_value = name_input.value;
                is_name_valid = validateName(name_value);
                if (!is_name_valid) inputErrorAnimation(name_input);
            }
            if (phone_input) {
                phone_value = phone_input.value;
                is_phone_valid = validatePhone(phone_value);
                if (!is_phone_valid) inputErrorAnimation(phone_input);
            }
            if (email_input) {
                email_value = email_input.value;
                is_email_valid = validateEmail(email_value);
                if (!is_email_valid) inputErrorAnimation(email_input);
            }
            if (city_input) {
                city_value = city_input.value;
                is_city_valid = city_value.length;
                if (!is_city_valid) inputErrorAnimation(city_input);
            }
            if (destination_select) {
                destination_value = destination_select.value;
                is_destination_valid = destination_value.length;
                if (!is_destination_valid) inputErrorAnimation(destination_select.closest('.edd-head'));
            }
            if (destination_input) {
                destination_value = destination_input.value;
                is_destination_valid = destination_value.length;
                if (!is_destination_valid) inputErrorAnimation(destination_input);
            }
            if (n_of_passengers_select) {
                n_of_passengers_value = n_of_passengers_select.value;
                is_n_of_passengers_valid = n_of_passengers_value.length;
                if (!is_n_of_passengers_valid) inputErrorAnimation(n_of_passengers_select.closest('.edd-head'));
            }
            if (date_input) {
                date_value = date_input.value;
                is_date_valid = date_value.length;
                if (!is_date_valid) inputErrorAnimation(date_input);
            }
            if (how_old_select) {
                how_old_value = how_old_select.value;
                is_how_old_valid = how_old_value.length;
                if (!is_how_old_valid) inputErrorAnimation(how_old_select.closest('.edd-head'));
            }
            if (question_input) {
                question_value = question_input.value;
                is_question_valid = question_value.length;
                if (!is_question_valid) inputErrorAnimation(question_input);
            }
            if (feedback_input) {
                feedback_value = feedback_input.value;
                is_feedback_valid = feedback_value.length;
                if (!is_feedback_valid) inputErrorAnimation(feedback_input);
            }
            if (checkbox_input) {
                is_checkbox_valid = validateCheckbox(checkbox_input);
                if (!is_checkbox_valid) inputErrorAnimation(checkbox_input.closest(".checkbox"));
            }
            let is_form_valid = is_name_valid && is_phone_valid && is_email_valid && is_city_valid && is_destination_valid && is_date_valid && is_how_old_valid && is_question_valid && is_feedback_valid && is_checkbox_valid;
            Pace.restart();
            if (is_form_valid) {
                Pace.track(function () {
                    postAjax('/callback/record_callback/', {
                        csrfmiddlewaretoken: csrftoken,
                        note: note_value,
                        name: name_value,
                        phone: phone_value,
                        email: email_value,
                        city: city_value,
                        destination: destination_value,
                        n_of_passengers: n_of_passengers_value,
                        date: date_value,
                        how_old: how_old_value,
                        question: question_value,
                        feedback: feedback_value,
                        detected_or_selected_city: "—",
                    }, function (data) {
                        Pace.restart();
                        document.querySelector("[data-popbox-id=popbox-result] .title__text").innerHTML = 'Спасибо, ваша заявка отправлена';
                        popbox.open("popbox-result")
                    }, function (data) {
                        document.querySelector("[data-popbox-id=popbox-result] .title__text").innerHTML = 'Ошибка! Пожалуйста, перезагрузите страницу и попробуйте отправить запрос снова.';
                        popbox.open("popbox-result")
                    });
                    form.reset();
                    popbox.close(form.closest(".popbox"));
                });
            }
        });
    });

    function validateName(inputNameValue) {
        let name_format = /^[A-Za-z\u0400-\u04FF\s]+$/;
        return !!inputNameValue.match(name_format);
    }

    function validatePhone(inputPhoneValue) {
        return !!(inputPhoneValue.length === 15);
    }

    function validateCheckbox(input) {
        return input.checked;
    }

    function validateEmail(inputEmailValue) {
        let mail_format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return !!inputEmailValue.match(mail_format);
    }

    function inputErrorAnimation(input) {
        input.classList.add("bounce");
        setTimeout(function () {
            input.classList.remove("bounce");
        }, 1000);
    }
}());

function postAjax(url, data, success, fail) {
    let params = typeof data == 'string' ? data : Object.keys(data).map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&');
    let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState > 3 && xhr.status === 200) {
            success(xhr.responseText);
        }
        if (xhr.status !== 200) {
            fail(xhr.responseText)
        }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    return xhr;
}

function getAjax(url, success, fail) {
    let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState > 3 && xhr.status === 200) {
            success(xhr.responseText);
        }
        if (xhr.status !== 200) {
            fail(xhr.responseText)
        }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();
    return xhr;
}

(function () {
    let burger = document.querySelector('[data-js=burger]');
    let menu = document.querySelector('[data-js=header-mob-menu]');
    let site_content_wrapper = document.querySelector('[data-js=site-content-wrapper]');
    let html = document.querySelector("html");
    burger.addEventListener("click", e => {
        site_content_wrapper.classList.toggle('site-content-wrapper_blured');
        html.classList.toggle('popbox_locked');
        burger.classList.toggle('burger_active');
        menu.classList.toggle('header-mob-menu_active')
    });
}());
(function () {
    ymaps.ready(init);

    function init() {
        let myMap;
        document.querySelectorAll('[data-js=open-branches-map-btn]').forEach(btn => {
            btn.addEventListener('click', e => {
                if (myMap) {
                    myMap.destroy();
                    myMap = null;
                }
                let myCenter = btn.getAttribute("data-map-coordinates").split`,`.map(x => +x);
                let myAddress = btn.getAttribute("data-map-address");
                let myCity = btn.getAttribute("data-map-city");
                let myPlacemark = btn.getAttribute("data-map-placemark");

                let iconSize = [123, 164];
                let iconImageOffset = [-62, -164];
                let zoomLevel = 16;
                if (window.innerWidth < 1050) {
                    iconSize = [83, 114];
                    iconImageOffset = [-42, -114];
                }
                myMap = new ymaps.Map('popbox-map-container', {
                    center: myCenter,
                    zoom: zoomLevel,
                }, {}), myPlacemark = new ymaps.Placemark(myCenter, {
                    hintContent: 'EASYVISA AGENCY<br>' + myCity,
                    balloonContent: myAddress
                }, {
                    iconLayout: 'default#image',
                    iconImageHref: myPlacemark,
                    iconImageSize: iconSize,
                    iconImageOffset: iconImageOffset
                }), myMap.geoObjects.add(myPlacemark);
                // myMap.controls.remove('zoomControl');
                myMap.controls.remove('geolocationControl');
                myMap.controls.remove('searchControl');
                myMap.controls.remove('trafficControl');
                myMap.controls.remove('typeSelector');
                myMap.controls.remove('fullscreenControl');
                myMap.controls.remove('rulerControl');
            });
        })
    }
}());
(function () {
    if (Boolean(document.querySelector('[data-js=map-n-contact__map-toggler]'))) {
        let toggler = document.querySelector('[data-js=map-n-contact__map-toggler]');
        let overlay = document.querySelector('[data-js=map-n-contact__map-overlay]');
        let box = document.querySelector('[data-js=map-n-contact__box]');
        toggler.addEventListener('click', e => {
            toggler.classList.toggle("map-n-contact__map-toggler_active");
            box.classList.toggle("map-n-contact__box_hidden");
            if (toggler.classList.contains("map-n-contact__map-toggler_active")) {
                toggler.innerHTML = "Свернуть карту";
                overlay.style.opacity = '0';
                box.style.opacity = '0';
                overlay.addEventListener("transitionend", e => overlay.style.zIndex = "0");
                box.addEventListener("transitionend", e => box.style.zIndex = "0");
            } else {
                toggler.innerHTML = "Показать карту";
                overlay.style.zIndex = "2";
                box.style.zIndex = "3";
                overlay.style.opacity = '1';
                box.style.opacity = '1';
                overlay.addEventListener("transitionend", e => overlay.style.zIndex = "2");
                box.addEventListener("transitionend", e => box.style.zIndex = "3")
            }
        });
    }
}());
(function () {
    if (Boolean(document.querySelector('input[name=phone]'))) {
        document.querySelectorAll("input[name=phone]").forEach(input => {
            input.addEventListener("input", mask, false);
            input.addEventListener("focus", mask, false);
            input.addEventListener("blur", mask, false);
        });
    }

    function setCursorPosition(pos, elem) {
        elem.focus();
        if (elem.setSelectionRange) elem.setSelectionRange(pos, pos); else if (elem.createTextRange) {
            let range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd("character", pos);
            range.moveStart("character", pos);
            range.select();
        }
    }

    function mask(event) {
        let matrix = "_ ___ ___ __ __", i = 0, def = matrix.replace(/\D/g, ""), val = this.value.replace(/\D/g, "");
        if (def.length >= val.length) val = def;
        this.value = matrix.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
        });
        if (event.type === "blur") {
            if (this.value.length === 2) this.value = "";
        } else setCursorPosition(this.value.length, this);
    }
})();
var url = new URL(location.href);
var debug = false;
if (debug) console.log('Debug level ' + debug);
var mswpScanPage = function (tag = 'mswp') {
    if (debug) console.log('Scan page using tag "' + tag + '"');
    let items = new Array();
    document.querySelectorAll("[data-js=photoswipe-item]").forEach(photoswipe_item => {
        let rel = photoswipe_item.getAttribute("data-photoswipe-group-id");
        if (!items[rel]) {
            if (debug) console.log('Create list ' + rel);
            items[rel] = new Array();
        }
        let width = photoswipe_item.getAttribute('width') || 0;
        let height = photoswipe_item.getAttribute('height') || 0;
        let idx = items[rel].length;
        items[rel][idx] = {src: photoswipe_item.href, title: photoswipe_item.title, w: width, h: height};
        photoswipe_item.addEventListener("click", e => {
            e.preventDefault();
            let element = document.querySelectorAll('.pswp')[0];
            let mswp = new MediaSwipe(element, PhotoSwipeUI_Default, items[rel], {index: idx, maxSpreadZoom: 4});
            mswp.init();
            return false
        })
    });
};
var video_n_thumb_player;
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
    if (debug) console.log('onYouTubeIframeAPIReady');
    if (Boolean(document.querySelectorAll("[data-js=photoswipe-item]"))) {
        mswpScanPage();
    }
    video_n_thumb_player = new YT.Player('video-n-thumb__video-container', {
        events: {
            'onReady': function () {
                document.querySelectorAll("[data-js=video-n-thumb__thumb]").forEach(thumb => {
                    thumb.addEventListener("click", e => {
                        let video_n_thumb = thumb.closest("[data-js=video-n-thumb]");
                        let video_id = video_n_thumb.getAttribute("data-video-id");
                        video_n_thumb_player.loadVideoById(video_id);
                        thumb.style.display = "none";
                    })
                });
            }
        }
    });
}

(function () {
    function scrollTo(id) {
        let element = document.getElementById(id);
        let headerOffset = 60;
        let elementPosition = element.offsetTop;
        let offsetPosition = elementPosition - headerOffset;
        document.documentElement.scrollTop = offsetPosition;
        document.body.scrollTop = offsetPosition;
    }

    document.querySelectorAll("[data-scroll-to]").forEach(link => {
        link.addEventListener("click", e => {
            let elem_id = link.getAttribute("data-scroll-to");
            scrollTo(elem_id);
        })
    })
}());
(function () {
    let show_more_list = document.querySelectorAll("[data-show-more=show-more]");
    show_more_list.forEach(show_more => {
        let show_more_btn = show_more.querySelector("[data-js=show-more__btn]");
        let when_show_more_width = show_more.getAttribute("data-show-more-when");
        let height_show_more = show_more.getAttribute("data-show-more-height");
        let height_after_show_more = show_more.getAttribute("data-height-after-show-more-js");
        let show_more_content = show_more.querySelector("[data-show-more-content=show-more__content]");
        let show_more_shadow = show_more.querySelector("[data-js=show-more__shadow]");
        show_more_content.style.maxHeight = height_show_more + "px";
        show_more_shadow.style.height = height_show_more + "px";
        isActive(when_show_more_width, show_more, height_after_show_more);
        window.addEventListener("resize", e => {
            isActive(when_show_more_width, show_more, height_after_show_more)
        });

        function isActive(when_show_more_width, show_more) {
            if (window.innerWidth < when_show_more_width) {
                show_more.classList.add("show-more_active");
                if (!(show_more.classList.contains("show-more_open"))) {
                    show_more_content.style.maxHeight = height_show_more + "px";
                    show_more_shadow.style.height = height_show_more + "px";
                }
                show_more_btn.addEventListener("click", e => {
                    show_more.classList.add("show-more_open");
                    if (height_after_show_more) {
                        show_more_content.style.maxHeight = height_after_show_more + "px";
                    } else {
                        show_more_content.style.maxHeight = show_more_content.scrollHeight + 900 + "px";
                    }
                })
            } else {
                show_more.classList.remove("show-more_active");
                show_more_content.style.maxHeight = "unset";
                show_more_shadow.style.height = 0 + "px";
            }
        }
    })
}());
(function () {
    document.querySelectorAll("[data-js=swap-places]").forEach(btn => {
        btn.addEventListener("click", e => {
            let form = btn.closest("form");
            let city_departure = form.querySelector("#city_departure");
            let city_arrival = form.querySelector("#city_arrival");
            let city_departure_value = city_departure.value;
            city_departure.value = city_arrival.value;
            city_arrival.value = city_departure_value;
            if (city_departure.value.length === 0) {
                city_departure.closest(".fl").classList.remove('fl_focused');
            } else {
                city_departure.closest(".fl").classList.add('fl_focused');
            }
            if (city_arrival.value.length === 0) {
                city_arrival.closest(".fl").classList.remove('fl_focused');
            } else {
                city_arrival.closest(".fl").classList.add('fl_focused');
            }
        })
    })
}());

function wrap_slider_children(slider, wrap_class, callback) {
    let elems_to_wrap = slider.children;
    for (let i = 0; i < elems_to_wrap.length; i++) {
        let elem_to_wrap = elems_to_wrap[0];
        let wrapper = document.createElement("div");
        wrapper.className = wrap_class;
        wrap_elem(elem_to_wrap, wrapper)
    }
    callback()
}

function wrap_elem(elemToWrap, wrapper) {
    wrapper = wrapper || document.createElement('div');
    elemToWrap.parentNode.appendChild(wrapper);
    return wrapper.appendChild(elemToWrap);
}

(function () {
    if (Boolean(document.querySelector('[data-js=visa-title]'))) {
        let visa_title_list = document.querySelectorAll('[data-js=visa-title]');
        visa_title_list.forEach(visa_title => {
            visa_title.addEventListener("click", e => {
                let visa_container = visa_title.closest("[data-js=visa-container]");
                let visa_list = document.querySelectorAll("[data-js=visa-title-list-item]");
                let visa_card_list = document.querySelectorAll('[data-js=visa-card]');
                let visa_column_list = [...visa_container.querySelectorAll("[data-js=visa-title-list-column]")];
                let visa_column_list_sliced;
                let i = 0;
                let visa_column_current = visa_title.closest("[data-js=visa-title-list-column]");
                let visa_list_current = [...visa_column_current.querySelectorAll("[data-js=visa-title-list-item]")];
                let visa = visa_title.closest("[data-js=visa-title-list-item]");
                let visa_index = visa_list_current.indexOf(visa);
                let visa_column_index = visa_column_list.indexOf(visa_column_current);
                let visa_card = visa.querySelector("[data-js=visa-card]");
                let visa_card_height = visa_card.scrollHeight;
                let margin_bottom_from_visa_card = 40;
                if (window.innerWidth <= 1150 && window.innerWidth > 600) {
                    margin_bottom_from_visa_card = 26;
                } else if (window.innerWidth <= 600) {
                    margin_bottom_from_visa_card = 16;
                }
                visa_column_list_sliced = getColumnListSliced(visa_column_list, visa_column_index);
                visa_card_list.forEach(visa_card_i => {
                    hide_visa_card(visa_card_i);
                });
                for (i = 0; i < visa_list.length; i++) {
                    visa_list[i].style.marginBottom = "0px";
                    visa_title_list[i].classList.remove("visa-title_active")
                }
                show_visa_card(visa_card);
                for (i = 0; i < visa_column_list_sliced.length; i++) {
                    if (visa_column_list_sliced[i].querySelectorAll("[data-js=visa-title-list-item]")[visa_index]) {
                        visa_column_list_sliced[i].querySelectorAll("[data-js=visa-title-list-item]")[visa_index].style.marginBottom = visa_card_height + margin_bottom_from_visa_card + "px";
                    }
                }
                visa_title.classList.add("visa-title_active")
            })
        });
    }

    function getColumnListSliced(visa_column_list, visa_column_index) {
        let visa_column_list_sliced = new Array();
        if (window.innerWidth <= 1000 && window.innerWidth > 520) {
            if (visa_column_index == 2) {
                visa_column_list_sliced = visa_column_list.slice(2);
            } else {
                visa_column_list_sliced = visa_column_list.slice(0, 2);
            }
        } else if (window.innerWidth <= 520) {
            visa_column_list_sliced.push(visa_column_list[visa_column_index]);
            console.log(visa_column_list_sliced)
        } else {
            visa_column_list_sliced = visa_column_list;
        }
        return visa_column_list_sliced;
    }

    function show_visa_card(visa_card) {
        visa_card.classList.add("visa-card_active");
        visa_card.style.maxHeight = visa_card.scrollHeight + "px";
        visa_card.style.opacity = "1";
        visa_card.style.zIndex = "2";
        visa_card.addEventListener("transitionend", () => visa_card.style.zIndex = "2");
    }

    function hide_visa_card(visa_card) {
        visa_card.classList.remove("visa-card_active");
        visa_card.style.maxHeight = "0px";
        visa_card.style.opacity = "0";
        visa_card.addEventListener("transitionend", () => visa_card.style.zIndex = "-2");
    }
})();
(function () {
}());
paceOptions = {ajax: true};
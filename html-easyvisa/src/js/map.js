(function () {
    if (Boolean(document.querySelector('#map-n-contact__map-container'))) {
        let placemark_name = document.querySelector('#map-n-contact__map-container').getAttribute("data-placemark");

        ymaps.ready(function (e) {
            let myCenter = [48.684308573825604, 44.44031949999993];
            let iconSize = [123, 164];
            let zoomLevel = 17;
            if (window.innerWidth < 1050) {
                myCenter = [48.684908573825604, 44.44431949999993];
                iconSize = [83, 114];
                zoomLevel = 16
            }
            var myMap = new ymaps.Map('map-n-contact__map-container', {
                    center: myCenter,
                    zoom: zoomLevel,
                    //controls: ['zoomControl', 'typeSelector', 'fullscreenControl', 'routeButtonControl']
                    //controls: ['zoomControl', 'typeSelector', 'fullscreenControl', 'routeButtonControl']
                }, {}),

                // Создаём макет содержимого.
                MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                    '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
                ),

                myPlacemark = new ymaps.Placemark([48.684308573825604, 44.44431949999993], {
                    hintContent: 'EASYVISA AGENCY<br>Санкт-Петербург',
                    balloonContent: 'Проспект Большой В.О. д. 9/6, <br>ЛИТЕР А, пом.3-Н, офис 117\n'
                }, {
                    // Опции.
                    // Необходимо указать данный тип макета.
                    iconLayout: 'default#image',
                    // Своё изображение иконки метки.
                    iconImageHref: 'img/' + placemark_name,
                    // Размеры метки.
                    iconImageSize: iconSize,
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [-40, -118]
                })

            myMap.geoObjects
                .add(myPlacemark)

            // myMap.behaviors.disable('scrollZoom');
            myMap.controls.remove('zoomControl');
            myMap.controls.remove('geolocationControl');
            myMap.controls.remove('searchControl');
            myMap.controls.remove('trafficControl');
            myMap.controls.remove('typeSelector');
            myMap.controls.remove('fullscreenControl');
            myMap.controls.remove('rulerControl');
        });
    }

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
(function () {
    // As soon as the API is loaded and DOM is ready, let's perform the initialization
    ymaps.ready(init);

    // Initialization and destruction of the map when the button is clicked.
    function init() {
        let myMap;

        document.querySelectorAll('[data-js=open-branches-map-btn]').forEach(btn => {

            btn.addEventListener('click', e => {
                if (myMap) {
                    myMap.destroy();// Destructor of the map
                    myMap = null;
                }

                let myCenter = JSON.parse(btn.getAttribute("data-map-coordinates"));
                let myAddress = btn.getAttribute("data-map-address");
                let myCity = btn.getAttribute("data-map-city");

                let iconSize = [123, 164];
                let zoomLevel = 17;

                if (window.innerWidth < 1050) {
                    iconSize = [83, 114];
                    zoomLevel = 16
                }
                myMap = new ymaps.Map('popbox-map-container', {
                    center: myCenter,
                    zoom: zoomLevel,
                }, {}),

                    // Создаём макет содержимого.
                    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
                    ),

                    myPlacemark = new ymaps.Placemark(myCenter, {
                        hintContent: 'EASYVISA AGENCY<br>' + myCity,
                        balloonContent: myAddress
                    }, {
                        // Опции.
                        // Необходимо указать данный тип макета.
                        iconLayout: 'default#image',
                        // Своё изображение иконки метки.
                        iconImageHref: 'img/placemark.png',
                        // Размеры метки.
                        iconImageSize: iconSize,
                        // Смещение левого верхнего угла иконки относительно
                        // её "ножки" (точки привязки).
                        iconImageOffset: [-40, -118]
                    }),

                    myMap.geoObjects
                        .add(myPlacemark);

                myMap.controls.remove('zoomControl');
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



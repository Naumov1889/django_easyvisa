(function () {
    document.querySelectorAll("[data-js=swap-places]").forEach(btn => {
        btn.addEventListener("click", e => {
            let form = btn.closest("form");
            let city_departure = form.querySelector("[name=city_departure]");
            let city_arrival = form.querySelector("[name=city_arrival]");
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

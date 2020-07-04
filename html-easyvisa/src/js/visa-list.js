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
                    visa_column_list_sliced[i]
                        .querySelectorAll("[data-js=visa-title-list-item]")[visa_index]
                        .style.marginBottom = visa_card_height + margin_bottom_from_visa_card + "px";
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
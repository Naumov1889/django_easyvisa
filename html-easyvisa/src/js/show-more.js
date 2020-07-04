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
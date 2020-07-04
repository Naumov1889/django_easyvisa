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
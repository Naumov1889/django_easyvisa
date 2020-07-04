(function () {
    function scrollTo(id) {
        let element = document.getElementById(id);
        let headerOffset = 60;
        let elementPosition = element.offsetTop;
        let offsetPosition = elementPosition - headerOffset;
        document.documentElement.scrollTop = offsetPosition;
        document.body.scrollTop = offsetPosition; // For Safari
    }

    document.querySelectorAll("[data-scroll-to]").forEach(link => {
        link.addEventListener("click", e => {
            let elem_id = document.querySelector("[data-scroll-to]").getAttribute("data-scroll-to");
            scrollTo(elem_id);
        })
    })

}());

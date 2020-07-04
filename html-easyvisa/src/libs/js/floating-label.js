(function () {
    document.querySelectorAll('.fl__input').forEach(input => {
        input.addEventListener('focus', function (e) {
            input.closest(".fl").classList.add('fl_focused');
        });
        input.addEventListener('blur', function (e) {
            if (this.value.length === 0) {
                input.closest(".fl").classList.remove('fl_focused');
            }
        });
    })
})();
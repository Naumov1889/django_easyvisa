let popbox = new Popbox();

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

(function () {
    let csrftoken = getCookie('csrftoken');

    document.querySelectorAll("[data-js=callback-btn]").forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();

            let form = btn.closest("form");

            // let csrfValue = form.querySelector("input[name=csrfmiddlewaretoken]").value;
            let nameInput = form.querySelector("input[name=name]");
            let nameValue = nameInput.value;
            let isNameValid = validateName(nameValue);
            let phoneInput = form.querySelector("input[name=phone]");
            let phoneValue = phoneInput.value;
            let isPhoneValid = validatePhone(phoneValue);

            console.log(nameValue, phoneValue);

            // let isCheckboxValid = true;
            // if (Boolean(form.querySelector(".checkbox"))) {
            //     let checkbox_object = form.querySelector('.checkbox');
            //     let checkbox_input = form.querySelector('.checkbox__input');
            //     isCheckboxValid = validateCheckbox(checkbox_input);
            // }

            // let vacancyValue = "—";
            // let productValue = "—";
            // let emailValue = "—";
            // let isEmailValid = true;
            //
            // if (Boolean(form.querySelector("input[name=vacancy]"))) {
            //     vacancyValue = form.querySelector("input[name=vacancy]").value;
            // }
            //
            // if (Boolean(form.querySelector("input[name=product]"))) {
            //     productValue = form.querySelector("input[name=product]").value;
            // }
            //
            // if (Boolean(form.querySelector("input[name=email]"))) {
            //     let emailInput = form.querySelector("input[name=email]");
            //     emailValue = emailInput.value;
            //     isEmailValid = validateEmail(emailValue);
            //     if (!isEmailValid) inputErrorAnimation(emailInput);
            // }


            if (!isNameValid) inputErrorAnimation(nameInput);
            if (!isPhoneValid) inputErrorAnimation(phoneInput);
            // if (!isCheckboxValid) inputErrorAnimation(checkbox_object);
            //
            let isFormValid = isNameValid && isPhoneValid;


            if (isFormValid) {
                postAjax('/callback/record_callback/', {
                    csrfmiddlewaretoken: csrftoken,
                    name: nameValue,
                    phone: phoneValue,
                    // email: emailValue,
                }, function (data) {
                    document.querySelector('[data-js=spinner]').style.display = "none";
                    popbox.open("popbox-callback-result")
                }, function (data) {
                    document.querySelector('[data-js=spinner]').style.display = "none";
                    document.querySelector("[data-popbox-id=popbox-callback-result] .title__text").innerHTML = 'Ошибка! Пожалуйста, перезагрузите страницу и попробуйте отправить запрос снова.';
                    popbox.open("popbox-callback-result")
                });
                form.reset();
                popbox.close(form.closest(".popbox"));
                document.querySelector('[data-js=spinner]').style.display = "inline-block";
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
    let params = typeof data == 'string' ? data : Object.keys(data).map(
        function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
        }
    ).join('&');

    let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState > 3 && xhr.status === 200) {
            success(xhr.responseText);
        } else {
            fail(xhr.responseText)
        }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    return xhr;
}


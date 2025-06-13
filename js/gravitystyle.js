(function () {
    function checkFormStatus(ev) {
        var eventFunc = `event_${ev.type}`;

        if (typeof Fields[eventFunc] !== "undefined") {
            try {
                Fields[eventFunc](ev.target, ev);
            } catch (error) {
                console.error(error);
            }
        }
    }

    var Fields = {
        event_input: (form, ev) => {
        },
        event_submit: (form, ev) => {
        },
        event_focus: (field, ev) => {
            var parent = field.closest(".gfield,span");
            if (!parent) {
                return;
            }
            parent.classList.add("is-selected");
        },
        event_blur: (field, ev) => {
            var parent = field.closest(".gfield,span");
            if (!parent) {
                return;
            }
            parent.classList.remove("is-selected");
        },
        event_change: (field, ev) => {
            var parent = field.closest(".gfield,span");
            if (!parent) {
                return;
            }
            if (field.value) {
                parent.classList.add("has-value");
            } else {
                parent.classList.remove("has-value");
            }
        },
    };

    function loadEvents(form) {
        form.addEventListener("change", checkFormStatus);
        form.addEventListener("input", checkFormStatus);
        form.addEventListener("submit", checkFormStatus, true);
        form.addEventListener("focus", checkFormStatus, true);
        form.addEventListener("blur", checkFormStatus, true);

        Array.from(
            form.querySelectorAll('input:not([type="submit"]),textarea')
        ).forEach((input) => {
            Fields.event_change(input);
        });
    }

    jQuery(document).on('gform_post_render', function (ev, formID, current_page) {
        let form = document.querySelector(`.gform_wrapper form#gform_${formID}`)
        if (!form) {
            return;
        }

        loadEvents(form);
    });
})();

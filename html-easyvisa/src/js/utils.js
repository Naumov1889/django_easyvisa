function wrap_slider_children(slider, wrap_class, callback) {
    let elems_to_wrap = slider.children;
    for (let i = 0; i < elems_to_wrap.length; i++) {
        let elem_to_wrap = elems_to_wrap[0];
        let wrapper = document.createElement("div");
        wrapper.className = wrap_class;
        wrap_elem(elem_to_wrap, wrapper)
    }

    callback()
}

function wrap_elem(elemToWrap, wrapper) {
    wrapper = wrapper || document.createElement('div');
    elemToWrap.parentNode.appendChild(wrapper);
    return wrapper.appendChild(elemToWrap);
}

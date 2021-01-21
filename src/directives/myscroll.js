import Vue from 'vue'
export const myscroll = {
    bind (el, binding, vnode)  {
    el.addEventListener('click' ,() => {
        console.log(document.getElementById(binding.value))
        console.log(binding.value)
        var element = document.getElementById(binding.value)
        element.scrollIntoView({block: "start"})
    })
},
    update(newValue, oldValue) {
       // console.log(newValue, oldValue)
    }
};


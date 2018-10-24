const ctgrEl = document.getElementsByClassName("categories").item(0);
const filterEl = document.getElementsByClassName("filter").item(0);
const dotEl = document.getElementsByClassName("dots__dot");




//menu state 
ctgrActive = false;
window.addEventListener("click", () => {

    if (ctgrActive && !(event.target.className.substr(0, 10) == "categories")) {
        document.getElementsByClassName("categories__menu").item(0).classList.add("disp-none");


    }

})
ctgrEl.addEventListener("click", () => {
    document.getElementsByClassName("filter__menu").item(0).classList.add("disp-none");


    if (event.target.className.substr(0, 11) == "categories_" && !(document.getElementsByClassName("categories__menu").item(0).classList.contains("disp-none"))) {
        console.log("ta")
    } else {
        console.log(event.target)
        document.getElementsByClassName("categories__menu").item(0).classList.toggle("disp-none");
        if (document.getElementsByClassName("categories__menu").item(0).classList.contains("disp-none")) {
            ctgrActive = false;
        } else {
            ctgrActive = true;
        }
    }

})

filterEl.addEventListener("click", e => {
    document.getElementsByClassName("categories__menu").item(0).classList.add("disp-none");
    document.getElementsByClassName("filter__menu").item(0).classList.toggle("disp-none");
    event.stopPropagation();

}, false)
document.getElementsByClassName("filter__menu").item(0).addEventListener("click", () => {
    event.stopPropagation()
})









//hamburger animations 
let hamburgerVisible = false;
document.getElementsByClassName("header__hamburger").item(0).addEventListener("click", () => {
    let hamb = document.getElementsByClassName("header__hamburger-inside").item(0);

    console.log(hamburgerVisible);
    if (hamburgerVisible) {
        
        hamb.classList.add("header__hamburger-close");
        hamb.classList.remove("header__hamburger-open");
        hamburgerVisible = false;
    } else {
        
        hamb.classList.add("header__hamburger-open");

        hamb.classList.remove("header__hamburger-close");
        hamburgerVisible = true;
    }
})




for (let i = 0; i < document.getElementsByClassName("offer__item-image").length; i++) {
    document.getElementsByClassName("offer__item-image").item(i).addEventListener("mouseover", function () {
        this.src = `images/offer/img${i}-hover.png`;
        document.getElementsByClassName("icon__heart").item(i).classList.toggle("disp-none");
        document.getElementsByClassName("offer__item-addToCart").item(i).classList.toggle("disp-none");
        document.getElementsByClassName("offer__item-price").item(i).classList.toggle("disp-none");


    }, true)
}
for (let i = 0; i <= document.getElementsByClassName("offer__item-image").length - 1; i++) {

    document.getElementsByClassName("offer__item-image").item(i).addEventListener("mouseout", function () {
        this.src = `images/offer/img${i}-normal.png`;
        document.getElementsByClassName("icon__heart").item(i).classList.toggle("disp-none");
        document.getElementsByClassName("offer__item-addToCart").item(i).classList.toggle("disp-none");
        document.getElementsByClassName("offer__item-price").item(i).classList.toggle("disp-none");

    }, true)
}

for (let i = 1; i <= document.querySelectorAll(".categories li").length - 1; i++) {
    document.querySelectorAll(".categories li").item(i).addEventListener("click", function () {
        for (let x = 1; x <= document.querySelectorAll(".categories li").length - 1; x++) {
            document.getElementsByClassName("categories__point").item(x).classList.remove("categories__active");
        }
        this.classList.add("categories__active");
    })
}


//color checkbox 
for (let i = 0; i < document.getElementsByClassName("filter__color-checkbox").length; i++) {
    document.getElementsByClassName("filter__color-checkbox").item(i).addEventListener("click", function () {
        for (let x = 0; x < document.getElementsByClassName("filter__color-checkbox").length; x++) {
            document.getElementsByClassName("filter__color-checkbox").item(x).innerHTML = "";
        }
        let checkEl = document.createElement("ion-icon");
        checkEl.src = "svg/_ionicons_svg_md-checkmark.svg";
        checkEl.classList.add("filter__color-checkbox-active")
        this.appendChild(checkEl);
    })
}


let filterSizeEl = document.querySelectorAll(".filter__size > div");
for (let i = 0; i < filterSizeEl.length; i++) {
    filterSizeEl.item(i).addEventListener("click", function () {
        for (let x = 0; x < filterSizeEl.length; x++) {
            filterSizeEl.item(x).removeAttribute("class")
        }
        this.classList.add("filter__size-active");
    })
}

let heartsEl = document.getElementsByClassName("icon__heart");
for (let i = 0; i < heartsEl.length; i++) {
    heartsEl.item(i).addEventListener("click", function () {
        this.src = "svg/_ionicons_svg_md-heart.svg";
    }, false)
}

// multirange START
(function () {
    "use strict";

    var supportsMultiple = self.HTMLInputElement && "valueLow" in HTMLInputElement.prototype;

    var descriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");

    self.multirange = function (input) {
        if (supportsMultiple || input.classList.contains("multirange")) {
            return;
        }

        var value = input.getAttribute("value");
        var values = value === null ? [] : value.split(",");
        var min = +(input.min || 0);
        var max = +(input.max || 100);
        var ghost = input.cloneNode();

        input.classList.add("multirange", "original");
        ghost.classList.add("multirange", "ghost");

        input.value = values[0] || min + (max - min) / 2;
        ghost.value = values[1] || min + (max - min) / 2;

        input.parentNode.insertBefore(ghost, input.nextSibling);

        Object.defineProperty(input, "originalValue", descriptor.get ? descriptor : {
            // Fuck you Safari >:(
            get: function () {
                return this.value;
            },
            set: function (v) {
                this.value = v;
            }
        });

        Object.defineProperties(input, {
            valueLow: {
                get: function () {
                    return Math.min(this.originalValue, ghost.value);
                },
                set: function (v) {
                    this.originalValue = v;
                },
                enumerable: true
            },
            valueHigh: {
                get: function () {
                    return Math.max(this.originalValue, ghost.value);
                },
                set: function (v) {
                    ghost.value = v;
                },
                enumerable: true
            }
        });

        if (descriptor.get) {
            // Again, fuck you Safari
            Object.defineProperty(input, "value", {
                get: function () {
                    return this.valueLow + "," + this.valueHigh;
                },
                set: function (v) {
                    var values = v.split(",");
                    this.valueLow = values[0];
                    this.valueHigh = values[1];
                    update();
                },
                enumerable: true
            });
        }

        if (typeof input.oninput === "function") {
            ghost.oninput = input.oninput.bind(input);
        }

        function update() {
            ghost.style.setProperty("--low", 100 * ((input.valueLow - min) / (max - min)) + 1 + "%");
            ghost.style.setProperty("--high", 100 * ((input.valueHigh - min) / (max - min)) - 1 + "%");
            document.getElementsByClassName("filter__input").item(0).placeholder = (input.valueLow - min) * 10;
            document.getElementsByClassName("filter__input").item(1).placeholder = (input.valueHigh - min) * 10;

        }

        input.addEventListener("input", update);
        ghost.addEventListener("input", update);

        update();
    }

    multirange.init = function () {
	[].slice.call(document.querySelectorAll("input[type=range][multiple]:not(.multirange)")).forEach(multirange);
    }

    if (document.readyState == "loading") {
        document.addEventListener("DOMContentLoaded", multirange.init);
    } else {
        multirange.init();
    }

})();

//multirange END



// slider start


let slider = state => {

    let currentImg = parseInt(document.getElementsByClassName("counter__current-img").item(0).textContent);
    let currentDot = currentImg;
    if (state == "prev") {

        for (let i = 0; i < document.querySelectorAll(".slider > .slider__cont, .dots").length; i++) {

            document.querySelectorAll(".slider > .slider__cont, .dots")[i].classList.add("sliderAnimationFadeOut");
        }

        if (currentImg == 1) {
            currentImg = 3;
        } else {
            currentImg--;
        }

        if (currentDot == 1) {
            dotEl.item(--currentDot).classList.remove("dots__active");
            dotEl.item(currentDot = 2).classList.add("dots__active");
        } else {
            dotEl.item(--currentDot).classList.remove("dots__active");
            dotEl.item(--currentDot).classList.add("dots__active");
        }
        console.log(currentDot)
        console.log(currentImg)
    } else {
        for (let i = 0; i < document.querySelectorAll(".slider > .slider__cont, .dots").length; i++) {
            document.querySelectorAll(".slider > .slider__cont, .dots")[i].classList.add("sliderAnimationFadeOut");
        }
        if (currentImg == 3) {
            currentImg = 0;
        }
        if (currentDot == 3) {
            dotEl.item(--currentDot).classList.remove("dots__active");
            dotEl.item(currentDot = 0).classList.add("dots__active");
        } else {
            dotEl.item(--currentDot).classList.remove("dots__active");
            dotEl.item(++currentDot).classList.add("dots__active");
        }
        ++currentImg;
    }
    document.querySelector(".slider > .slider__cont, .dots").addEventListener("animationend", () => {
        document.getElementById("sliderImage").src = `images/slider_${currentImg}.png`;

        for (let i = 0; i < document.querySelectorAll(".slider > .slider__cont, .dots").length; i++) {
            document.querySelectorAll(".slider > .slider__cont, .dots")[i].classList.remove("sliderAnimationFadeOut");
        }
    })


    document.getElementsByClassName("counter__current-img").item(0).textContent = currentImg;
}

document.getElementById("slider-right").addEventListener("click", () => {
    slider("next");
})

document.getElementById("slider-left").addEventListener("click", () => {
    slider("prev");
})
// brand 
for (let i = 0; i < document.querySelectorAll(".filter__desktop--content li").length; i++) {
    document.querySelectorAll(".filter__desktop--content li")[i].addEventListener("click", function () {
        for (let x = 0; x < document.querySelectorAll(".filter__desktop--content li").length; x++) {

            document.querySelectorAll(".filter__desktop--content li")[x].classList.remove("filter__desktop--point-active");

        }
        this.classList.add("filter__desktop--point-active");
    })
}
for (let i = 0; i < document.querySelectorAll(".filter__desktop--content span").length; i++) {
    document.querySelectorAll(".filter__desktop--content span")[i].addEventListener("click", function () {
        for (let x = 0; x < document.querySelectorAll(".filter__desktop--content span").length; x++) {

            document.querySelectorAll(".filter__desktop--content span")[x].classList.remove("filter__desktop--point-active");

        }
        this.classList.add("filter__desktop--point-active");
    })
}

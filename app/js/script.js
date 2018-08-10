let sortState = false;
let ctgrEl = document.getElementsByClassName("categories").item(0);
let filterEl = document.getElementsByClassName("filter__title").item(0);
let dotEl = document.getElementsByClassName("dots__dot");


let bgChanger = (state) => {
    if (state == 2 || state == 3) {
        document.getElementsByClassName("slider").item(0).style.background = "#efefef";

        document.getElementById("sliderImage").style.paddingLeft = "7rem";
    } else {
        document.getElementsByClassName("slider").item(0).style.background = "#f5f5f5";
        document.getElementById("sliderImage").style.paddingLeft = "0";
    }
}




ctgrEl.addEventListener("click", () => {
    sortState = !sortState;
    document.getElementsByClassName("categories__menu").item(0).classList.toggle("disp-none");
    if (sortState) {

        document.getElementsByClassName("filter").item(0).classList.add("disp-none");
    }
})
filterEl.addEventListener("click", () => {
    if (sortState) {
        document.getElementsByClassName("categories__menu").item(0).classList.add("disp-none");
    }
    sortState = !sortState;
    document.getElementsByClassName("filter").item(0).classList.toggle("disp-none");
})





let slider = state => {

    let currentImg = parseInt(document.getElementsByClassName("counter__current-img").item(0).textContent);
    let currentDot = currentImg;
    if (state == "prev") {

        document.querySelector(".slider > .slider__cont, .dots").classList.add("sliderAnimationLeft");
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
    } else {
        document.querySelector(".slider > .slider__cont, .dots").classList.add("sliderAnimationRight");
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
    document.getElementById("sliderImage").src = `images/slider_${currentImg}.png`
    bgChanger(currentImg);
    document.getElementsByClassName("counter__current-img").item(0).textContent = currentImg;
}

document.getElementsByClassName("slider__link")[0].addEventListener("click", () => {
    slider("next");
})

document.getElementsByClassName("slider__image")[0].addEventListener("click", () => {
    slider("prev");
})






//hamburger animations 
document.getElementsByClassName("header__hamburger").item(0).addEventListener("click", () => {
    let hamb = document.getElementsByClassName("header__hamburger-inside").item(0);
    hamb.classList.toggle("disp-none")
    /* hamb.classList.toggle("header__hamburger-close");
    hamb.classList.toggle("header__hamburger-open");
    if(hamb.classList.contains("header__hamburger-close")){
        hamb.addEventListener("animationend",hamb.classList.add("disp-none"))
    }else{hamb.classList.remove('disp-none')}
*/
})





//multirange.js START
/*
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
            document.getElementsByClassName("filter__input").item(0).placeholder = ((input.valueLow - min) + 10) * 5;
            document.getElementsByClassName("filter__input").item(1).placeholder = (input.valueHigh - min) * 10;
            ghost.style.setProperty("--low", 100 * ((input.valueLow - min) / (max - min)) + 1 + "%");
            ghost.style.setProperty("--high", 100 * ((input.valueHigh - min) / (max - min)) - 1 + "%");
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

})();*/
//multirange.js END


for (let i = 0; i < document.getElementsByClassName("offer__item-image").length;i++) {
    document.getElementsByClassName("offer__item-image").item(i).addEventListener("mouseover", function () {
            this.src = `images/offer/img${i}-hover.png`;
        })
    }
for (let i = 0; i < document.getElementsByClassName("offer__item-image").length;i++) {
    document.getElementsByClassName("offer__item-image").item(i).addEventListener("mouseout", function () {
            this.src = `images/offer/img${i}-normal.png`;
        })
    }


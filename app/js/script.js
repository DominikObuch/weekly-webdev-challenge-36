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

        if (currentImg == 1) {
            currentImg = 3;
        } else {
            currentImg--;
        }
        console.log(currentImg)

        if (currentDot == 1) {
            dotEl.item(--currentDot).classList.remove("dots__active");
            dotEl.item(currentDot = 2).classList.add("dots__active");
        } else {
            dotEl.item(--currentDot).classList.remove("dots__active");
            dotEl.item(--currentDot).classList.add("dots__active");
        }
    } else {
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

let sortState = false;
let ctgrEl = document.getElementsByClassName("categories").item(0);
let filterEl = document.getElementsByClassName("filter__title").item(0);
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

let slider = () => {

    let currentImg = parseInt(document.getElementsByClassName("counter__current-img").item(0).textContent);
    let currentDot = currentImg;

    if (currentImg == 3) {
        currentImg = 0;
    }
    
    if (currentDot == 3) {
        document.getElementsByClassName("dots__dot").item(--currentDot).classList.remove("dots__active");
        currentDot = 0;
        document.getElementsByClassName("dots__dot").item(currentDot).classList.add("dots__active");
    }
    else{
    document.getElementsByClassName("dots__dot").item(--currentDot).classList.remove("dots__active");

    document.getElementsByClassName("dots__dot").item(++currentDot).classList.add("dots__active");
}

    currentImg++;
    document.getElementById("sliderImage").src = `images/slider_${currentImg}.png`
    document.getElementsByClassName("counter__current-img").item(0).textContent = currentImg;

}

document.getElementsByClassName("slider__link")[0].addEventListener("click", () => {
    slider();
})

document.getElementsByClassName("slider__image")[0].addEventListener("click", () => {
    slider();
})

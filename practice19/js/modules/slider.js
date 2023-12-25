function slider() {
    const sliderCounterWrapper = document.querySelector('.offer__slider-counter'),
        sliderControlPrev = sliderCounterWrapper.querySelector('.offer__slider-prev'),
        sliderControlNext = sliderCounterWrapper.querySelector('.offer__slider-next'),
        sliderNumberCurrent = sliderCounterWrapper.querySelector('#current'),
        sliderNumberTotal = sliderCounterWrapper.querySelector('#total'),
        sliderViewWrapper = document.querySelector('.offer__slider-wrapper'),
        slides = sliderViewWrapper.querySelectorAll('.offer__slide'),
        width = window.getComputedStyle(sliderViewWrapper).width,
        slidesField = document.querySelector(".offer__slider-inner"),
        slider = document.querySelector('.offer__slider'),
        dots = [];
    let currentSlideNumber = 1,
        totalSlideNumber = slides.length,
        offset = 0;

    function getSlideNumber(number) {
        return number < 10 ? '0' + number : number;
    }

    function initSlider() {
        slidesField.style.width = 100 * slides.length + "%";
        slidesField.style.display = "flex";
        slidesField.style.transition = "0.5s all";

        sliderViewWrapper.style.overflow = "hidden";

        slides.forEach((slide) => {
            slide.style.width = width;
        });
        sliderNumberCurrent.innerText = getSlideNumber(currentSlideNumber);
        sliderNumberTotal.innerText = getSlideNumber(totalSlideNumber);
        slidesField.style.transform = `translateX(-${offset}px)`;

        slider.style.position = 'relative';

        const indicators = document.createElement('ol');
        indicators.classList.add('carousel-indicators');
        slider.append(indicators);
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('li');
            dot.setAttribute('data-slide-to', i + 1);
            dot.classList.add('dot');
            if (i === 0) {
                dot.style.opacity = 1;
            }
            indicators.append(dot);
            dots.push(dot);
        }
    }

    initSlider();

    sliderControlPrev.addEventListener('click', () => {
        if (currentSlideNumber === 1) {
            currentSlideNumber = totalSlideNumber;
        } else {
            currentSlideNumber--;
        }
        sliderNumberCurrent.innerText = getSlideNumber(currentSlideNumber);

        if (offset === 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        dots.forEach(dot => dot.style.opacity = `.5`);
        dots[currentSlideNumber - 1].style.opacity = 1;
    });

    sliderControlNext.addEventListener('click', () => {
        if (currentSlideNumber === totalSlideNumber) {
            currentSlideNumber = 1;
        } else {
            currentSlideNumber++;
        }
        sliderNumberCurrent.innerText = getSlideNumber(currentSlideNumber);

        if (offset === +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        dots.forEach(dot => dot.style.opacity = `.5`);
        dots[currentSlideNumber - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            currentSlideNumber = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            sliderNumberCurrent.innerText = getSlideNumber(currentSlideNumber);
            dots.forEach(dot => dot.style.opacity = `.5`);
            dots[currentSlideNumber - 1].style.opacity = 1;
        })
    });
}

module.exports = slider;
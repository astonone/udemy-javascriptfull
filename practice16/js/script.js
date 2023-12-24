window.addEventListener('DOMContentLoaded', function () {

    // Tabs
    let tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {

        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', function (event) {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target === item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Timer
    const deadline = '2023-12-31';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - new Date(),
            days = Math.floor((t / (1000 * 60 * 60 * 24))),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60) % 24));

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') === '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 300000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // Using classes for creating of menu cards

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Price:</div>
                <div class="menu__item-total"><span>${this.price}</span> eur/day</div>
            </div>
        `;
            this.parent.append(element);
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getResource('http://localhost:8000/food-delivery/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    // Forms

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Thanks! We contact with you soon',
        failure: 'Something went wrong...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            },
            body: data
        });
        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement("afterend", statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()))
            postData('http://localhost:8000/food-delivery/contact-us', json)
                .then(data => {
                    console.log(data);
                    showResponseModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                showResponseModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showResponseModal(message) {
        const prevModal = document.querySelector('.modal__content');

        prevModal.classList.add('hide');
        openModal();

        const newRespModal = document.createElement('div');
        newRespModal.classList.add('modal__content');
        newRespModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal__dialog').append(newRespModal);
        setTimeout(() => {
            newRespModal.remove();
            prevModal.classList.add('show');
            prevModal.classList.remove('hide');
            closeModal();
        }, 4000)
    }

    // Slider

    const sliderCounterWrapper = document.querySelector('.offer__slider-counter'),
        sliderControlPrev = sliderCounterWrapper.querySelector('.offer__slider-prev'),
        sliderControlNext = sliderCounterWrapper.querySelector('.offer__slider-next'),
        sliderNumberCurrent = sliderCounterWrapper.querySelector('#current'),
        sliderNumberTotal = sliderCounterWrapper.querySelector('#total'),
        sliderViewWrapper = document.querySelector('.offer__slider-wrapper'),
        slides = sliderViewWrapper.querySelectorAll('.offer__slide'),
        width = window.getComputedStyle(sliderViewWrapper).width,
        slidesField = document.querySelector(".offer__slider-inner");
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
    });
});
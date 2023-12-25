function calculator() {
    // Calculator

    const result = document.querySelector('.calculating__result span');
    let sex = localStorage.getItem('sex') ? localStorage.getItem('sex') : 'female',
        height, weight, age,
        ratio = localStorage.getItem('ratio') ? +localStorage.getItem('ratio') : 1.375;

    function initCalc(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(el => {
            el.classList.remove(activeClass);
            if (+el.getAttribute('data-ratio') === ratio) {
                el.classList.add(activeClass);
            }
            if (el.getAttribute('id') === sex) {
                el.classList.add(activeClass);
            }
        })
    }

    initCalc('#gender', 'calculating__choose-item_active');
    initCalc('.calculating__choose_big', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex === 'Female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    function getStaticData(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                console.log(ratio, sex);

                elements.forEach(el => {
                    el.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);

                calcTotal();
            });
        })
        document.querySelector(parentSelector)
    }

    getStaticData('#gender', 'calculating__choose-item_active');
    getStaticData('.calculating__choose_big', 'calculating__choose-item_active');

    function getDynamicData(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', (e) => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch (e.target.getAttribute('id')) {
                case 'height' :
                    height = +input.value;
                    break;
                case 'weight' :
                    weight = +input.value;
                    break;
                case 'age' :
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }

    getDynamicData('#height');
    getDynamicData('#weight');
    getDynamicData('#age');

    calcTotal();
}

module.exports = calculator;
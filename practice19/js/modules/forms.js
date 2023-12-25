function form() {
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
}

module.exports = form;
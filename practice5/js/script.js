'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

function removeAd() {
    const advertPlace = document.querySelector('.promo__adv')
    const advertsElements = advertPlace.querySelectorAll('*');
    advertsElements.forEach(item => item.remove());
}

function changePromoGenre() {
    const promoGenre = document.querySelector('.promo__genre');
    promoGenre.innerText = 'драма';
}

function changePromoBackground() {
    const promoBackground = document.querySelector('.promo__bg');
    promoBackground.style.background = `url("img/bg.jpg")`;
}

function prepareWatchedMovesList() {
    removeOldWatchedMovies();

    const { movies } = movieDB;
    const watchedMoviesPlace = document.querySelector('.promo__interactive-list');
    movies.sort().forEach((movieName, i) => {
        createMovieListElementWithNumber(watchedMoviesPlace, movieName, i+ 1);
    });
}

function removeOldWatchedMovies() {
    const watchedMovies = document.querySelectorAll('.promo__interactive-item');
    watchedMovies.forEach(item => item.remove());
}

function createMovieListElementWithNumber(parentElement, movieName, i) {
    const newMovie = document.createElement('li');
    newMovie.innerHTML = `${i}. ${movieName}<div class="delete"></div>`;
    newMovie.classList.add('promo__interactive-item');
    parentElement.append(newMovie);
}

removeAd();
changePromoGenre();
changePromoBackground();
prepareWatchedMovesList();



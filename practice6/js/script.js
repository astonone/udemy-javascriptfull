'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Logan",
            "Justice League",
            "La La Land",
            "Whiplash",
            "Scott Pilgrim vs..."
        ]
    };

    const advertPlace = document.querySelector('.promo__adv'),
        advertsElements = advertPlace.querySelectorAll('*'),
        promoBackground = document.querySelector('.promo__bg'),
        promoGenre = promoBackground.querySelector('.promo__genre'),
        watchedMoviesPlace = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add');

    const removeAd = (adverts) => {
        adverts.forEach(item => item.remove());
    }

    const changePromoGenre = (genre) => {
        genre.innerText = 'drama';
    }

    const changePromoBackground = (background) => {
        background.style.background = `url("img/bg.jpg")`;
    }

    const renderWatchedMovesList = (watchedMoviesPlace, movies) => {
        removeOldWatchedMovies(watchedMoviesPlace);

        movies = sortMovies(movies);
        movies.forEach((movieName, i) => {
            createMovieListElementWithNumber(watchedMoviesPlace, movieName, i + 1);
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                movieDB.movies.splice(i, 1);
                renderWatchedMovesList(watchedMoviesPlace, movies);
            })
        })
    }

    const removeOldWatchedMovies = (watchedMoviesPlace) => {
        watchedMoviesPlace.innerText = '';
    }

    const createMovieListElementWithNumber = (parentElement, movieName, i) => {
        const newMovie = document.createElement('li');
        newMovie.innerHTML = `${i}. ${movieName}<div class="delete"></div>`;
        newMovie.classList.add('promo__interactive-item');
        parentElement.append(newMovie);
    }

    const sortMovies = (moviesArr) => moviesArr.map(m => m.toLowerCase()).sort();

    removeAd(advertsElements);
    changePromoGenre(promoGenre);
    changePromoBackground(promoBackground);
    renderWatchedMovesList(watchedMoviesPlace, movieDB.movies);

    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const input = addForm.querySelector('.adding__input');
        const checkbox = addForm.querySelector('[type="checkbox"]');
        let movieName = input.value;
        if (movieName) {
            if (movieName.length > 21) {
                movieName = `${movieName.substring(0, 21)}...`;
            }
            if (checkbox.checked) {
                console.log('Adding a favourite film');
            }
            movieDB.movies.push(movieName);
            renderWatchedMovesList(watchedMoviesPlace, movieDB.movies);
        }

        event.target.reset();
    });
});



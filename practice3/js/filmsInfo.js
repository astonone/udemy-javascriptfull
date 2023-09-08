'use strict';

let numberOfFilms;

function start() {
    numberOfFilms = +prompt('How much films have you watched?', '');
    console.log(numberOfFilms);
    while (numberOfFilms === null || numberOfFilms === '' || isNaN(numberOfFilms) || numberOfFilms === 0) {
        numberOfFilms = +prompt('How much films have you watched?', '');
    }
}

start();

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    private: false
};

function rememberMyFilms() {
    for (let i = 0; i < 2; i++) {
        let filmName = '';
        let filmRating = '';
        while (filmName === null || filmName.length === 0 || filmName.length > 50) {
            filmName = prompt('Write name of the one last films you have watched', '');
        }
        while (filmRating === null || filmRating.length === 0) {
            filmRating = prompt('Which is your rating of this film? (from 0.0 to 10.0');
        }

        personalMovieDB.movies[filmName] = filmRating;
    }
}

rememberMyFilms();

function detectPersonalLevel() {
    if (personalMovieDB.count < 10) {
        alert('Seems you do not enough like watch movies');
    } else if (personalMovieDB.count >= 10 && personalMovieDB.count <= 30) {
        alert('You are classic viewer');
    } else if (personalMovieDB.count > 30) {
        alert('You are a movie buff');
    } else {
        alert('Error happened!');
    }
}

detectPersonalLevel();

function showMyDB(isPrivate) {
    if (!isPrivate) {
        document.write(JSON.stringify(personalMovieDB));
    }
}

function writeYourGenres() {
    for (let i = 0; i < 3; i++) {
        let favoriteGenre = '';
        while (favoriteGenre === null || favoriteGenre.length === 0 || favoriteGenre.length > 50) {
            favoriteGenre = prompt(`Your favourite genre is number ${i + 1}`, '');
        }

        personalMovieDB.genres.push(favoriteGenre);
    }
}

writeYourGenres();

showMyDB(personalMovieDB.private);
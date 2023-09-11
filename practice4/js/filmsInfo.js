'use strict';

const personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    private: false,
    start: function () {
        personalMovieDB.count = +prompt('How much films have you watched?', '');
        while (personalMovieDB.count === null || personalMovieDB.count === '' || isNaN(personalMovieDB.count) || personalMovieDB.count === 0) {
            personalMovieDB.count = +prompt('How much films have you watched?', '');
        }
    },
    rememberMyFilms: function () {
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
    },
    detectPersonalLevel: function () {
        if (personalMovieDB.count < 10) {
            alert('Seems you do not enough like watch movies');
        } else if (personalMovieDB.count >= 10 && personalMovieDB.count <= 30) {
            alert('You are classic viewer');
        } else if (personalMovieDB.count > 30) {
            alert('You are a movie buff');
        } else {
            alert('Error happened!');
        }
    },
    writeYourGenres: function () {
        for (let i = 0; i < 3; i++) {
            let favoriteGenre = '';
            while (favoriteGenre === null || favoriteGenre.length === 0 || favoriteGenre.length > 50) {
                favoriteGenre = prompt(`Your favourite genre is number ${i + 1}`, '');
            }

            personalMovieDB.genres.push(favoriteGenre);
        }

        personalMovieDB.genres.forEach((item, i) => {
            console.log(`Favorite genre ${i + 1} - is ${item}`);
        });
    },
    showMyDB: function () {
        if (!personalMovieDB.private) {
            //document.write(JSON.stringify(personalMovieDB));
            console.log(JSON.stringify(personalMovieDB));
        }
    },
    toggleVisibleMyDb: function () {
        personalMovieDB.private = !personalMovieDB.private;
    }
};

personalMovieDB.start();
personalMovieDB.detectPersonalLevel();
personalMovieDB.rememberMyFilms();
personalMovieDB.writeYourGenres();
console.log('Printing db before toggle:');
personalMovieDB.showMyDB();

personalMovieDB.toggleVisibleMyDb();
console.log('Printing db after toggle:');
personalMovieDB.showMyDB();
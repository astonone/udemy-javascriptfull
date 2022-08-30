const numberOfFilms = prompt('How much films did you watch?', '');

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    private: false
};

console.log(personalMovieDB);
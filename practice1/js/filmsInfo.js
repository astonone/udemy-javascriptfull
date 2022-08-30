const numberOfFilms = prompt('How much films did you watch?', '');

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    private: false
};

for(let i = 0; i < 2; i++) {
    const filmName = prompt('Write name of the one last film you watched', '');
    const filmRating = prompt('Which is your rating of this film? (from 0.0 to 10.0');

    personalMovieDB.movies[filmName] = filmRating;
}

console.log(personalMovieDB);
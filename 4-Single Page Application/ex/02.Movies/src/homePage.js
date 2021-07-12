import Dom from './renderOnDom.js';
import constants from './constants.js';

const MOVIE_GET_URL = `${constants.ROOT_URL}data/movies`

const requestMovies = () => {
    fetch(MOVIE_GET_URL)
        .then(response => response.json())
        .then(movies => {
            Object.values(movies).forEach(e => {
                let movieDiv = Dom.formMoviePreview(e);
                document.querySelector(`#movie .card-deck`).appendChild(movieDiv);
            });
        }).catch(err => console.log(err))
};

const generateMovies = () => {
    requestMovies()
};
export default {
    generateMovies
};
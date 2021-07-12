import constants from './constants.js';
import auth from './auth.js';
import editMoviePage from './editMoviePage.js';

const deleteFunc = async (e, movieid) => {
    let response = await fetch(`${constants.ROOT_URL}data/movies/${movieid}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'X-Authorization': auth.getToken()
        }
    })
    if (response.ok) {
        await response.json();
        let movies = constants.getViews().homePage[3]
        Array.from(movies.querySelectorAll(`div.mb-4`)).forEach(e => {
            if (e.dataset.movieid === movieid) {
                e.remove();
            }
        });
    }
};
const editFunc = (e, movieid) => {
    editMoviePage.callEditMoviePage(e.target.parentNode.parentNode.parentNode, movieid);
};

const extracted = async  (ownerId, movieId) => {
    await fetch(`http://localhost:3030/data/likes`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'X-Authorization': auth.getToken()
        },
        body: JSON.stringify({_ownerId: ownerId, movieId})
    });
};

const likeFunc = async (e, ownerId, movieId, elem) => {

    let likes = 0;
    try {
        let currData = await countLikesFunk()
        let movie = Object.values(currData).filter(e => e.movieId === movieId);

        if (movie.length === 0) {
            await extracted(ownerId, movieId);
        } else if (movie.length > 0) {
            let alreadyLikeMovie = Array.from(movie).some(e => e._ownerId === auth.getUserId());
            let owner = Array.from(movie).filter(e => e._ownerId === auth.getUserId());
            if (!alreadyLikeMovie) {
                await extracted(ownerId, movieId);
            } else {
                console.log(owner[0]._id)
                await fetch(`http://localhost:3030/data/likes/${owner[0]._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json',
                        'X-Authorization': auth.getToken()
                    }
                });
            }
        }

        let data = await getCountCommentsOnMovie(movieId);
        console.log(data);
        likes += Number(data.length);

    } catch (err) {
        console.log(err)
    } finally {
        elem.textContent = `Likes ${likes}`;
    }
};
const countLikesFunk = async () => {
    let response = await fetch(
        `http://localhost:3030/data/likes`);
    return await response.json();

};
const getCountCommentsOnMovie = async (movieId) => {
    let currData = await countLikesFunk()
    let movie = Object.values(currData).filter(e => e.movieId === movieId);
    console.log(movie)
    return movie
}
export default {
    deleteFunc, editFunc, likeFunc, countLikesFunk, getCountCommentsOnMovie
}

import constants from './constants.js';
import Utils from './utils.js';
import auth from './auth.js';
import renderOnDom from './renderOnDom.js';


const callMovieDetailsPage = (ownerId, movieId) => {
    Utils.goHome();
    Utils.hideAllViewsExceptOne('movieDetails');
        fetch(`http://localhost:3030/data/movies/${movieId}`)
            .then(response => response.json())
            .then(data => {
                return renderOnDom.formMovieDetails(data)

            })
            .then(data => constants.getViews().movieDetails.appendChild(data) )
            .catch(err => alert(err));

};
export default {
    callMovieDetailsPage
};

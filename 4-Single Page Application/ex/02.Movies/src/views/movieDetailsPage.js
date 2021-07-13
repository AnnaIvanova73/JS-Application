    import constants from '../constants/constants.js';
    import Utils from '../utils/utils.js';
    import renderOnDom from '../utils/renderOnDom.js';


    const callMovieDetailsPage = async (ownerId, movieId) => {
        Utils.goHome();
        Utils.hideAllViewsExceptOne('movieDetails');
            fetch(`http://localhost:3030/data/movies/${movieId}`)
                .then(response => response.json())
                .then(data => {
                    return renderOnDom.formMovieDetails(data)
                })
                .then(data => constants.getViews().movieDetails.appendChild(data))
                .catch(err => alert(err));

    };
    export default {
        callMovieDetailsPage
    };

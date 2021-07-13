import movieDetailsPage from "./views/movieDetailsPage.js"
import addMoviePage from "./views/addMoviePage.js";
import homePage from './views/homePage.js';
import navigation from './views/navigation.js';
import registerPage from './views/registerPage.js';
import loginPage from './views/loginPage.js';
import constants from './constants/constants.js';
import utils from './utils/utils.js';

utils.hideAllViewsExceptOne('homePage');
navigation.updateNavbar();
homePage.generateMovies();
const navViews = {
    register: () => {
        registerPage.callRegisterView();
    },
    login: () => {
        loginPage.callLoginView();
    },
    logout: () => {
        localStorage.clear();
        utils.hideAllViewsExceptOne('homePage')
    }
};

constants.getNavItems().navBar.addEventListener('click', (e) => {
    e.preventDefault();
    navigation.updateNavbar();
    let navClickedBtn = e.target.textContent.toLowerCase();
    if (Object.keys(navViews).includes(navClickedBtn)) {
        navViews[navClickedBtn]();
        navigation.updateNavbar();
    }
});

constants.getViews().homePage[1].querySelector('a').addEventListener('click', (e) => {
    e.preventDefault();
    addMoviePage.callAddMovieView();
});
constants.getViews().homePage[3].addEventListener('click', async (e) => {
    if (e.target.type === 'button') {
        let ownerId = e.target.parentNode.parentNode.parentNode.getAttribute('data-ownerid');
        let movieId = e.target.parentNode.parentNode.parentNode.getAttribute('data-movieid');
        constants.getViews().movieDetails.textContent = '';
        await movieDetailsPage.callMovieDetailsPage(ownerId, movieId);
    }
});


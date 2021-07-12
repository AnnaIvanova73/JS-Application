import movieDetailsPage from "./movieDetailsPage.js"
import addMoviePage from "./addMoviePage.js";
import homePage from './homePage.js';
import navigation from './navigation.js';
import registerPage from './registerPage.js';
import loginPage from './loginPage.js';
import constants from './constants.js';
import utils from './utils.js';

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
        await movieDetailsPage.callMovieDetailsPage(ownerId, movieId);
        constants.getViews().movieDetails.textContent = '';
    }
});

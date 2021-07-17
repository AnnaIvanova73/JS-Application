import createPage from "./src/pages/createPage.js";
import detailsPage from "./src/pages/detailsPage.js";
import editPage from "./src/pages/editPage.js";
import homePage from "./src/pages/homePage.js";
import login from "./src/pages/loginPage.js";
import register from "./src/pages/registerPage.js";
import viewDelegator from "./src/viewDelegator.js"
import authService from "./src/services/authService.js"

import navigation from "./src/runners/nav.js";
import viewPort from "./src/runners/viewPort.js";

const startApp = () => {
    message();

    createPage.init(document.querySelector('#add-movie'));
    detailsPage.init(document.querySelector('#movie-example'));
    editPage.init(document.querySelector('#edit-movie'));
    homePage.init(document.querySelector('#home-page'),'link');
    login.init(document.querySelector('#form-login'));
    register.init(document.querySelector('#form-sign-up'));
    navigation.init(document.querySelector('#navigation'));
    viewDelegator.init(document.querySelector('#app'), '.view');

    viewPort.init(document.querySelectorAll('.link'), '.link', viewDelegator.changeView);


    viewPort.navigateTo('home');
};

startApp();
function message (){

    authService.removeToken();
   alert(`Зачиствам, локалстор на всяко ново зареждане, ако те дразни закоментирай функцията`)
}
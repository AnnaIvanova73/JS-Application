import page from './node_modules/page/page.mjs';
import catalogPage from './src/pages/catalogPage.js';
import detailsPage from './src/pages/detailsPage.js';
import delFurniture from './src/pages/deleteFurnitureAction.js';
import nav from './src/pages/nav.js';
import loginPage from "./src/pages/loginPage.js";
import registerPage from "./src/pages/registerPage.js";
import userViewPage from "./src/pages/userViewPage.js";
import createPage from "./src/pages/createPage.js";
import editPage from "./src/pages/editPage.js";
import authService from "./src/services/authService.js";

const router = () => {
    page('/home',catalogPage);
    page('/details/:id',detailsPage);
    page('/login',loginPage);
    page('/logout',authService.logout);
    page('/register',registerPage);
    page('/my-furniture',userViewPage);
    page('/create',createPage);
    page('/edit/:id',editPage);
    page('/delete/:id',delFurniture);
    page('/','/home');
    page.start();
};

const startApp = () => {
    nav.init(document.querySelector('#navigation'));
    router()
};
startApp();
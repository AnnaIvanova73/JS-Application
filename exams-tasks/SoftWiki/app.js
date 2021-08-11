import page from './node_modules/page/page.mjs';


import details from './src/pages/details/detailsPage.js';

import edit from './src/pages/edit/editPage.js';
import recordsPage from './src/pages/allRecords/recordsPage.js';
import createPage from './src/pages/create/createPage.js';
import registerPage from './src/pages/register/registerPage.js';
import loginPage from './src/pages/login/loginPage.js';
import homePage from './src/pages/home/homePage.js';

import nav from './src/nav/navView.js';
import deleteRecord from './src/handlingEvents/deleteRecord.js';
import logout from './src/handlingEvents/logout.js';

import Lit from './src/litRender/litRenderer.js';

import subjectService from "./src/services/subjectActionService.js";
import authService from "./src/services/authService.js";

const startRouter = () => {
    page(nav.getView);
    page('/home', homePage.getView);
    page('/login', loginPage.getView);
    page('/register', registerPage.getView);
    page('/allRecords', recordsPage.getView);
    page('/create', createPage.getView);
    page('/details/:id', details.getView);
    page('/edit/:id', edit.getView);

    page('/index.html', '/');
    page('/', '/home');

    page.start();
};

const startApp = () => {
    const SEARCH_CRITERIA = 'category';
    const SORT_CRITERIA = 'title';

    const navContainer = document.querySelector('#nav');
    const mainContainer = document.querySelector('#app');

    const litRenderer = new Lit();

    let viewsRenderHandler = litRenderer.renderHandler(mainContainer);
    let navRenderHandler = litRenderer.renderHandler(navContainer);


    logout.init(page, authService);
    deleteRecord.init(page, subjectService);
    nav.init(page, navRenderHandler, authService, logout.getView);


    homePage.init(page, viewsRenderHandler, authService);
    loginPage.init(page, viewsRenderHandler, authService);
    registerPage.init(page, viewsRenderHandler, authService);

    createPage.init(page, viewsRenderHandler, authService,subjectService);
    recordsPage.init(page, viewsRenderHandler,authService, subjectService,SEARCH_CRITERIA,SORT_CRITERIA);

    edit.init(page, viewsRenderHandler, authService, subjectService);

    details.init(page, viewsRenderHandler, authService, subjectService, deleteRecord.delRecord);


    startRouter();
};

startApp();

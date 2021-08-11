import page from './node_modules/page/page.mjs';

import searchPage from './src/pages/search/searchPage.js';

import details from './src/pages/details/detailsPage.js';
import userRecords from './src/pages/userRecords/userRecordsPage.js';
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
    page('/userRecords/', userRecords.getView);
    page('/by-year/', searchPage.getView);

    page('/index.html', '/');
    page('/', '/home');

    page.start();
};

const startApp = () => {
    const SEARCH_PARAM = `year`;
    const navContainer = document.querySelector('#nav');
    const mainContainer = document.querySelector('#site-content');

    const litRenderer = new Lit();

    let viewsRenderHandler = litRenderer.renderHandler(mainContainer);
    let navRenderHandler = litRenderer.renderHandler(navContainer);


    logout.init(page, authService);
    deleteRecord.init(page, subjectService);
    nav.init(page, navRenderHandler, authService, logout.getView);


    homePage.init(page, viewsRenderHandler, authService);
    loginPage.init(page, viewsRenderHandler, authService);
    registerPage.init(page, viewsRenderHandler, authService);

    createPage.init(page, viewsRenderHandler, subjectService);
    recordsPage.init(page, viewsRenderHandler, subjectService);

    edit.init(page, viewsRenderHandler, authService, subjectService);
    userRecords.init(page, viewsRenderHandler, authService, subjectService);

    details.init(page, viewsRenderHandler, authService, subjectService, deleteRecord.delRecord);

    searchPage.init(page,viewsRenderHandler,subjectService,SEARCH_PARAM);

    startRouter();
};

startApp();

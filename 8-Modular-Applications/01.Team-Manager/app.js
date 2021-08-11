import page from './node_modules/page/page.mjs';

import Lit from './src/litRender/litRenderer.js';
import authService from "./src/services/authService.js";
import subjectService from "./src/services/subjectActionService.js";
import membershipService from "./src/services/membershipService.js";

import deleteRecord from './src/actioneEventLogic/deleteRecord.js';
import logout from './src/actioneEventLogic/logout.js';


import nav from './src/nav/navView.js';
import homePageGuest from './src/pages/homePage/guestHomePage.js';
import loginPage from './src/pages/loginPage/loginPage.js';
import registerPage from './src/pages/registerPage/registerPage.js';
import memeFeed from './src/pages/allRecordsPage/allRecordsPage.js';
import createPage from './src/pages/createPage/createPage.js';
import details from './src/pages/detailsPage/detailsPage.js';
import edit from './src/pages/editPage/editPage.js';
import userRecords from './src/pages/userRecordsPage/userRecordsPage.js';

import modal from './src/pages/modal/modalPage.js';

const startRouter = () => {
    page(nav.getView);
    page('/home', homePageGuest.getView);
    page('/login', loginPage.getView);
    page('/register', registerPage.getView);
    page('/allRecords', memeFeed.getView);
    page('/create', createPage.getView);
    page('/details/:id', details.getView);
    page('/edit/:id', edit.getView);
    page('/userRecords', userRecords.getView);

    page('/index.html', '/');
    page('/', '/home');

    page.start();
};

const startApp = () => {
    const navContainer = document.querySelector('#nav');
    const mainContainer = document.querySelector('#app');
    const modalContainer = document.querySelector('#modal');

    const litRenderer = new Lit();

    const viewsRenderHandler = litRenderer.renderHandler(mainContainer);
    const navRenderHandler = litRenderer.renderHandler(navContainer);
    const modalRenderHandler = litRenderer.renderHandler(modalContainer);

    modal.init(page,modalRenderHandler);

    logout.init(page,authService,modal.getView);
    deleteRecord.init(page,subjectService);
    nav.init(page, navRenderHandler, authService,logout.getView);


    userRecords.init(page, viewsRenderHandler, authService,subjectService);
    edit.init(page, viewsRenderHandler, authService,subjectService);
    details.init(page, viewsRenderHandler, authService,subjectService,membershipService);
    homePageGuest.init(page, viewsRenderHandler,authService);
    loginPage.init(page, viewsRenderHandler, authService);
    registerPage.init(page, viewsRenderHandler, authService);
    memeFeed.init(page, viewsRenderHandler, subjectService,authService);
    createPage.init(page, viewsRenderHandler, subjectService);



    startRouter();
};

startApp();

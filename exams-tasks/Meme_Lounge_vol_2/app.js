import page from './node_modules/page/page.mjs';

import authService from "./src/services/authService.js";
import subjectService from "./src/services/subjectActionService.js";

import Lit from './src/litRender/litRenderer.js';

import logout from './src/events/logout.js';
import deleteRecord from './src/events/deleteRecord.js';
import notifications from './src/events/notifications.js';

import edit from './src/pages/edit/editPage.js';
import details from './src/pages/details/detailsPage.js';
import createPage from './src/pages/create/createPage.js';
import loginPage from './src/pages/login/loginPage.js';
import registerPage from './src/pages/register/registerPage.js';
import userRecords from './src/pages/userRecords/userRecordsPage.js';

import nav from './src/nav/navView.js';

import recordsPage from './src/pages/allRecords/recordsPage.js';
import homePage from './src/pages/home/homePage.js';


const startRouter = () => {
    page(nav.getView);
    page('/home', homePage.getView);
    page('/allRecords', recordsPage.getView);
    page('/login', loginPage.getView);
    page('/register', registerPage.getView);
    page('/userRecords/', userRecords.getView);
    page('/create', createPage.getView);
    page('/details/:id', details.getView);
    page('/edit/:id', edit.getView);


    page('/index.html', '/');
    page('/', '/home');

    page.start();
};

const startApp = () => {
    const navContainer = document.querySelector('#nav');
    const mainContainer = document.querySelector('#app');
    const notificationsContainer = document.querySelector('#notifications');


    const litRenderer = new Lit();

    let viewsRenderHandler = litRenderer.renderHandler(mainContainer);
    let navRenderHandler = litRenderer.renderHandler(navContainer);
    let notificationsHandler = litRenderer.renderHandler(notificationsContainer);


    notifications.init(notificationsHandler);
    logout.init(page, authService);
    deleteRecord.init(page, subjectService);
    nav.init(page, navRenderHandler, authService, logout.getView);


    edit.init(page, viewsRenderHandler, authService, subjectService, notifications.getView);
    createPage.init(page, viewsRenderHandler, subjectService, notifications.getView);
    loginPage.init(page, viewsRenderHandler, authService, notifications.getView);
    registerPage.init(page, viewsRenderHandler, authService, notifications.getView);
    userRecords.init(page, viewsRenderHandler, authService, subjectService);
    details.init(page, viewsRenderHandler, authService, subjectService, deleteRecord.delRecord);
    recordsPage.init(page, viewsRenderHandler, subjectService);
    homePage.init(page, viewsRenderHandler, authService);

    startRouter();
};

startApp();

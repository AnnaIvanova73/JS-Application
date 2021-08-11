import page from './node_modules/page/page.mjs';

import Lit from './src/litRender/litRenderer.js';
import authService from "./src/services/authService.js";
import subjectService from "./src/services/subjectActionService.js";

import deleteRecord from './src/actioneEventLogic/deleteRecord.js';
import logout from './src/actioneEventLogic/logout.js';
import notifications from './src/actioneEventLogic/notifications.js';

import nav from './src/nav/navView.js';
import homePageGuest from './src/pages/guestHomePage.js';
import loginPage from './src/pages/loginPage.js';
import registerPage from './src/pages/registerPage.js';
import memeFeed from './src/pages/allRecordsPage.js';
import createPage from './src/pages/createPage.js';
import details from './src/pages/detailsPage.js';
import edit from './src/pages/editPage.js';
import userRecords from './src/pages/userRecordsPage.js';

const startRouter = () => {

    page(nav.getView);

    page('/home', homePageGuest.getView);
    page('/login', loginPage.getView);
    page('/register', registerPage.getView);
    page('/meme-feed', memeFeed.getView);
    page('/create', createPage.getView);
    page('/details/:id', details.getView);
    page('/edit/:id', edit.getView);
    page('/my-profile/:name', userRecords.getView);

    page('/index.html', '/');
    page('/', '/home');

    page.start();
};

const startApp = () => {
    const navContainer = document.querySelector('#nav');
    const mainContainer = document.querySelector('#app');
    const notificationsSection = document.querySelector('#notifications');

    const litRenderer = new Lit();

    let viewsRenderHandler = litRenderer.renderHandler(mainContainer);
    let navRenderHandler = litRenderer.renderHandler(navContainer);
    let notificationsHandler = litRenderer.renderHandler(notificationsSection);

    logout.init(page);
    deleteRecord.init(page);
    nav.init(page, navRenderHandler, authService,logout.getView);
    notifications.init(notificationsHandler,notificationsSection)

    userRecords.init(page, viewsRenderHandler, authService,subjectService);
    edit.init(page, viewsRenderHandler, authService,subjectService,notifications.displayNotification);
    details.init(page, viewsRenderHandler, authService,subjectService,deleteRecord.delRecord);
    homePageGuest.init(page, viewsRenderHandler);
    loginPage.init(page, viewsRenderHandler, authService,notifications.displayNotification);
    registerPage.init(page, viewsRenderHandler, authService,notifications.displayNotification);
    memeFeed.init(page, viewsRenderHandler, subjectService);
    createPage.init(page, viewsRenderHandler, subjectService,notifications.displayNotification);

    startRouter();
};

startApp();

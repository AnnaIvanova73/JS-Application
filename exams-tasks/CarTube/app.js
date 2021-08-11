import page from './node_modules/page/page.mjs';

import Lit from './src/litRender/litRenderer.js';
import authService from "./src/services/authService.js";
import subjectService from "./src/services/subjectActionService.js";



import bonusPage from './src/pages/bonusPage.js';
import userRecords from './src/pages/userRecordsPage.js';
import edit from './src/pages/editPage.js';
import details from './src/pages/detailsPage.js';
import deleteRecord from './src/actioneEventLogic/deleteRecord.js';
import logout from './src/actioneEventLogic/logout.js';
import createPage from './src/pages/createPage.js';
import registerPage from './src/pages/registerPage.js';
import loginPage from './src/pages/loginPage.js';
import nav from './src/nav/navView.js';
import homePage from './src/pages/homePage.js';
import allRecordsPage from './src/pages/allRecordsPage.js';

const startRouter = () => {
    page(nav.getView);
    page('/home', homePage.getView);
    page('/login', loginPage.getView);
    page('/register', registerPage.getView);
    page('/allRecords', allRecordsPage.getView);
    page('/create', createPage.getView);
    page('/details/:id', details.getView);
    page('/edit/:id', edit.getView);
    page('/userRecords/', userRecords.getView);
    page('/by-year/', bonusPage.getView);

    page('/index.html', '/');
    page('/', '/home');

    page.start();
}

const startApp = () => {
    const navContainer = document.querySelector('#nav');
    const mainContainer = document.querySelector('#site-content');

    const litRenderer = new Lit();

    let viewsRenderHandler = litRenderer.renderHandler(mainContainer);
    let navRenderHandler = litRenderer.renderHandler(navContainer);

    logout.init(page);
    deleteRecord.init(page);
    nav.init(page, navRenderHandler, authService,logout.getView);



    bonusPage.init(page, viewsRenderHandler, subjectService);
    userRecords.init(page, viewsRenderHandler, authService,subjectService);
    edit.init(page, viewsRenderHandler, authService,subjectService);
    details.init(page, viewsRenderHandler, authService,subjectService,deleteRecord.delRecord);
    homePage.init(page, viewsRenderHandler);
    loginPage.init(page, viewsRenderHandler, authService);
    registerPage.init(page, viewsRenderHandler, authService);
    allRecordsPage.init(page, viewsRenderHandler, subjectService);
    createPage.init(page, viewsRenderHandler, subjectService);

    startRouter();
};

startApp();

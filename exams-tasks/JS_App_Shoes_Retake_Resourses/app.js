import page from './node_modules/page/page.mjs';

import Lit from './src/litRender/litRenderer.js';
import authService from './src/services/authService.js';
import subjectService from './src/services/subjectActionService.js';
import specificsService from './src/services/specificsService.js';

import addBuyer from './src/actionEventsLogic/addBuyer.js';
import deleteRecord from './src/actionEventsLogic/deleteRecord.js';
import logout from './src/actionEventsLogic/logout.js';


// import userRecords from './src/pages/userRecordsPage/userRecordsPage.js';
import edit from './src/pages/editPage/editPage.js';
import details from './src/pages/detailsPage/detailsPage.js';
import createPage from './src/pages/createPage/createPage.js';
import allRecordsPage from './src/pages/allRecordsPage/allRecordsPage.js';
import homePage from './src/pages/homePage/homePage.js';
import registerPage from './src/pages/registerPage/registerPage.js';
import loginPage from './src/pages/loginPage/loginPage.js';
import nav from './src/nav/navView.js';


const startRouter = () => {
    page(nav.getView);
    page('/home', homePage.getView);
    page('/login', loginPage.getView);
    page('/register', registerPage.getView);
    page('/create', createPage.getView);
    page('/details/:id', details.getView);
    page('/edit/:id', edit.getView);
    // page('/userRecords', userRecords.getView);
    page('/allRecords', allRecordsPage.getView);


    page('/index.html', '/');
    page('/', '/home');

    page.start();
};

const startApp = () => {
    const navContainer = document.querySelector('#nav');
    const mainContainer = document.querySelector('#app');

    const litRenderer = new Lit();

    let viewsRenderHandler = litRenderer.renderHandler(mainContainer);
    let navRenderHandler = litRenderer.renderHandler(navContainer);

    addBuyer.init(page, specificsService);
    deleteRecord.init(page, subjectService);

    logout.init(page, authService);
    nav.init(page, navRenderHandler, authService, logout.getView);


    // userRecords.init(page, viewsRenderHandler, authService,subjectService);
    edit.init(page, viewsRenderHandler, authService, subjectService);
    details.init(page, viewsRenderHandler, authService, subjectService, specificsService, deleteRecord.delRecord, addBuyer.buyProduct);
    homePage.init(page, viewsRenderHandler, authService);
    loginPage.init(page, viewsRenderHandler, authService);
    registerPage.init(page, viewsRenderHandler, authService,);
    allRecordsPage.init(page, viewsRenderHandler, subjectService);
    createPage.init(page, viewsRenderHandler, subjectService);

    startRouter();
};

startApp();

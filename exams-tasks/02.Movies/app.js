import page from './node_modules/page/page.mjs';

import Lit from './src/litRender/litRenderer.js';
import authService from "./src/services/authService.js";
import subjectService from "./src/services/subjectActionService.js";
import specificsService from "./src/services/specificsService.js";
import constants from "./src/constants/constants.js";



import logout from './src/actionEventsLogic/logout.js';
import deleteRecord from './src/actionEventsLogic/deleteRecord.js';
import addLike from './src/actionEventsLogic/addLike.js';
import searchRecord from './src/actionEventsLogic/searchRecord.js';
import notifications from './src/actionEventsLogic/notifications.js';

import userRecords from './src/pages/userRecordsPage/userRecordsPage.js';
import edit from './src/pages/editPage/editPage.js';
import details from './src/pages/detailsPage/detailsPage.js';
import createPage from './src/pages/createPage/createPage.js';
import registerPage from './src/pages/registerPage/registerPage.js';
import loginPage from './src/pages/loginPage/loginPage.js';
import nav from './src/nav/navView.js';

import allRecordsPage from './src/pages/allRecordsPage/allRecordsPage.js';


const startRouter = () => {
    page(nav.getView);
    page('/home', allRecordsPage.getView);
    page('/login', loginPage.getView);
    page('/register', registerPage.getView);
    page('/create', createPage.getView);
    page('/details/:id', details.getView);
    page('/edit/:id', edit.getView);
    page('/userRecords/', userRecords.getView);


    page('/index.html', '/');
    page('/', '/home');

    page.start();
};

const startApp = () => {
    const navContainer = document.querySelector('#nav');
    const mainContainer = document.querySelector('#app');
    const notifySucceeds = document.querySelector('#notifySucceeds');
    const notifyErrors = document.querySelector('#notifyErrors');
    const litRenderer = new Lit();

    let viewsRenderHandler = litRenderer.renderHandler(mainContainer);
    let navRenderHandler = litRenderer.renderHandler(navContainer);
    let ntSucceeds = litRenderer.renderHandler(notifySucceeds);
    let ntErrors = litRenderer.renderHandler(notifyErrors);

    notifications.init(ntSucceeds,ntErrors,notifySucceeds,notifyErrors);
    searchRecord.init(page,specificsService);
    addLike.init(page,specificsService,notifications.getView);
    logout.init(page,authService,notifications.getView);
    deleteRecord.init(page,subjectService);
    nav.init(page, navRenderHandler, authService,logout.getView);



    userRecords.init(page, viewsRenderHandler, authService,subjectService);
    edit.init(page, viewsRenderHandler, authService,subjectService,notifications.getView);
    details.init(page, viewsRenderHandler, authService,subjectService,specificsService,deleteRecord.delRecord,addLike.likeRecord);
    loginPage.init(page, viewsRenderHandler, authService,notifications.getView);
    registerPage.init(page, viewsRenderHandler, authService,notifications.getView);
    allRecordsPage.init(page, viewsRenderHandler, authService,subjectService,searchRecord,constants.searchParam);
    createPage.init(page, viewsRenderHandler, subjectService,notifications.getView);

    startRouter();
};

startApp();

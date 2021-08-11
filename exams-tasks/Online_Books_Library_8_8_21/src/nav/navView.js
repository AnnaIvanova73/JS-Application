import nav from './navTemplate.js';

let currRouter = undefined;
let currHandler = undefined;
let authService = undefined;
let logout = undefined;

const init = (router, render, service, callbackLogout) => {
    currRouter = router;
    currHandler = render;
    authService = service;
    logout = callbackLogout;
};

const getView = async (context, next) => {
    let viewModel = {

        email: authService.getEmail(),
        username: authService.getUsername(),
        currPage: context.pathname,

        isLoggedIn: authService.isLoggedIn(),
        logout
        
    };
    let navTemplate = nav.navTemplate(viewModel);
    currHandler(navTemplate);
    next();
};

export default {
    init,
    getView
};
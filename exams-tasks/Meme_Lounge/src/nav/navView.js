import nav from '../templates/navTemplate.js';


let currRouter = undefined;
let currHandler = undefined;
let authService = undefined;
let logout = undefined;
const init = (router, render, service,callbackFunc) => {
    currRouter = router;
    currHandler = render;
    authService = service;
    logout = callbackFunc;
};

const getView = async (context, next) => {
    let viewModel = {
        isLoggedIn: authService.isLoggedIn(),
        email: authService.getEmail(),
        currPage: context.pathname,
        nameUser:authService.getUserName(),
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
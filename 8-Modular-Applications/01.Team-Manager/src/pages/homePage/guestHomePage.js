import {guestHomeTemplate} from './guestHomeTemplate.js';


let currRouter = undefined;
let currRender = undefined;
let authService = undefined;
let viewModel;
const init = (router, render, service1) => {
    currRouter = router;
    currRender = render;
    authService = service1;
    viewModel = {};
};

const getView = async () => {
    viewModel = {
        isLoggedIn: authService.isLoggedIn()
    };
    let viewTemp = guestHomeTemplate(viewModel);
    currRender(viewTemp);

};

export default {
    init,
    getView
};
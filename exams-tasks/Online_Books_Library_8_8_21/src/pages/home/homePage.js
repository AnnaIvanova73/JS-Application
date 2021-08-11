import homeTemplate from './homeTemplate.js';

let currRouter = undefined;
let currRender = undefined;
let authService = undefined;

const init = (router, render, service1) => {
    currRouter = router;
    currRender = render;
    authService = service1;
};

const getView = async () => {
    currRouter.redirect('/allRecords');
};

export default {
    init,
    getView
};
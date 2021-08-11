import modalTemplate from './modalTemplate.js';

let viewModel = undefined;
let currRouter = undefined;
let currRender = undefined;

const init = (router, render) => {
    currRouter = router;
    currRender = render;
    viewModel = {};
};

const getView = async (message) => {
    viewModel = {
        message,
    };

    let promise = new Promise((resolve,reject) => {
        viewModel.handler = (val) => {
            currRender(null);
            resolve(val)
        };
    });


    let currTemplate = modalTemplate.modal(viewModel);
    currRender(currTemplate);
    return promise;
};

export default {
    init,
    getView
};

import allRecords from './allRecordsTemplate.js';

let viewModel = {};
let currRouter = undefined;
let currRender = undefined;
let subjectService = undefined;
let authService = undefined;

const init = (router, render, service1,service2) => {
    currRouter = router;
    currRender = render;
    subjectService = service1;
    authService = service2;
};

const getView = async () => {
    try {
        viewModel['data'] = await subjectService.getAllRecords();
        viewModel.isLoggedIn = authService.isLoggedIn();
    } catch ( err ) {
        console.log('No memes, in database');
    }
    let currTemplate = allRecords.allRecords(viewModel);
    currRender(currTemplate);
};

export default {
    init,
    getView
};

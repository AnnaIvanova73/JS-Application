import userRecordsTemplate from './userRecordsTemplate.js';

let viewModel = {};
let currRouter = undefined;
let currRender = undefined;
let authService = undefined;
let subjectService = undefined;
let deleteFunc = undefined;

const init = (router, render, service1, service2, callback) => {
    currRouter = router;
    currRender = render;
    authService = service1;
    subjectService = service2;
    deleteFunc = callback;
};

const getView = async () => {
    try {
        let data = await subjectService.getAllRecordsWithUser();
        viewModel['data'] = data;
        viewModel.email = authService.getEmail();
        viewModel.count = Object.keys(data).length === undefined ? 0 : Object.keys(data).length ;
    } catch ( err ) {
        console.log(err);
    }
    let currTemplate = userRecordsTemplate.userRecords(viewModel);
    currRender(currTemplate);
};

export default {
    init,
    getView
};

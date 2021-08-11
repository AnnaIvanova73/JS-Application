import userRecordsTemplate from './userRecordsTemplate.js';

let viewModel = undefined;
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
    viewModel = {};
};

const getView = async () => {

    try {
        let data = await subjectService.getAllRecordsUser(authService.getUserId());
        viewModel['data'] = data;
        viewModel.countRecords = Object.keys(data).length === undefined ? 0 : Object.keys(data).length;

    } catch ( err ) {
        viewModel.countRecords = 0;
        console.log(err);
    } finally {
        viewModel.username = authService.getUsername();
        viewModel.email = authService.getEmail();

        let currTemplate = userRecordsTemplate.userRecords(viewModel);
        currRender(currTemplate);

    }
};

export default {
    init,
    getView
};

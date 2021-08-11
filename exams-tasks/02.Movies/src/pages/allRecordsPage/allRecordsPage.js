import allRecords from './allRecordsTemplate.js';

let viewModel = {};
let currRouter = undefined;
let currRender = undefined;

let authService = undefined;
let subjectService = undefined;
let specificsService = undefined;
let searchParam ;

const init = (router, render, service1, service2,service3,prmSearch) => {
    currRouter = router;
    currRender = render;
    authService = service1;
    subjectService = service2;
    specificsService = service3;
    searchParam = prmSearch;
};

const getView = async () => {
    try {
        viewModel['data'] = await subjectService.getAllRecords();
        viewModel.countRecords = Object.keys(viewModel.data).length;
        viewModel.isLoggedIn = authService.isLoggedIn();
        viewModel.findRecord = specificsService.findRecord.bind(null, searchParam);

    } catch ( err ) {
        viewModel.count = 0;
        console.log(err);
        console.log('No record, in database');
    }

    let currTemplate = allRecords.allRecords(viewModel);
    currRender(currTemplate);
};

export default {
    init,
    getView
};

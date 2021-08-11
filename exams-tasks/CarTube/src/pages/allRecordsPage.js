import allRecords from '../templates/allRecordsTemplate.js';

let viewModel = {};
let currRouter = undefined;
let currRender = undefined;
let subjectService = undefined;

const init = (router, render, service1) => {
    currRouter = router;
    currRender = render;
    subjectService = service1;
};

const getView = async () => {
    try {
        viewModel['data'] = await subjectService.getAllRecords();
    } catch ( err ) {
        viewModel.count = 0;
        console.log('No cars, in database');
    }
    let currTemplate = allRecords.allRecords(viewModel);
    currRender(currTemplate);
};

export default {
    init,
    getView
};

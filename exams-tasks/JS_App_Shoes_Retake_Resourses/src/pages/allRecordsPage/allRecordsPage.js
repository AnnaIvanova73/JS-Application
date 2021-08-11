import allRecords from './allRecordsTemplate.js';

let viewModel = undefined;
let currRouter = undefined;
let currRender = undefined;
let subjectService = undefined;


const init = (router, render, service1) => {
    currRouter = router;
    currRender = render;
    subjectService = service1;
    viewModel = {};
};

const redirectFromPage = (id) => {
    currRouter.redirect(`/details/${id}`);
}

const getView = async () => {
    try {

        viewModel['data'] = await subjectService.getAllRecords();
        viewModel.countRecords = Object.keys(viewModel.data).length;


    } catch ( err ) {

        viewModel.countRecords = 0;
        console.log('No record, in database');

    } finally {

        let currTemplate = allRecords.allRecords(viewModel,redirectFromPage);
        currRender(currTemplate);

    }

};

export default {
    init,
    getView
};

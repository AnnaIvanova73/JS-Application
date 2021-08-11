import searchTemplate from './searchTemplate.js';

let viewModel = undefined;
let currRouter = undefined;
let currRender = undefined;
let subjectService = undefined;
let searchCriteria;
let input;


const init = (router, render, service1, searchParam) => {
    currRouter = router;
    currRender = render;
    subjectService = service1;
    searchCriteria = searchParam;
    viewModel = {};
    input = '';
};

const getInput = (e) => {
    input = Number(e.target.value);
};
const search = async () => {
    viewModel.countRecords = 0;
    viewModel.shouldSearch = true;

    try {
        let data = await subjectService.getAllByParam(searchCriteria, input);
        viewModel.countRecords = data.length;
        console.log(data.length)
        viewModel['data'] = data;

    } catch ( err ) {

        console.log(err);

    } finally {

        let currTemplate = searchTemplate.displaySearch(viewModel);
        currRender(currTemplate);
    }

    input = '';
};

const getView = async () => {
    viewModel = {
        getInput,
        search,
        shouldSearch:false
    };
    let currTemplate = searchTemplate.displaySearch(viewModel);
    currRender(currTemplate);
};

export default {
    init,
    getView
};

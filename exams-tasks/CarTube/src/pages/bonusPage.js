import bonusPage from '../templates/bonusTemplate.js';

let currRouter = undefined;
let currRender = undefined;
let subjectService = undefined;
let viewModel;
let shouldRender;
let inputField= '';

const init = (router, render, service1) => {

    currRouter = router;
    currRender = render;
    subjectService = service1;
    viewModel ={count:0};
    shouldRender = false;
};

const valueInput = (e) => inputField = e.target;

const getViewAllRecords = async (e) => {
    shouldRender = true;
    let valTest = e.target.parentElement.firstElementChild.value;
    try {
        //viewModel['data'] = await subjectService.getAllByParam(inputField.value);
        viewModel['data'] = await subjectService.getAllByParam(valTest);
        viewModel.count = Object.keys(viewModel.data).length;
    } catch ( err ) {
        viewModel.count = 0;
        console.log('No cars, in database');
    }finally{
        inputField.value = '';
    }

    let currTemplate = bonusPage.bonus(getViewAllRecords,shouldRender,viewModel,valueInput);
    currRender(currTemplate);
};

const getView = () => {
    shouldRender = false;
    let currTemplate = bonusPage.bonus(getViewAllRecords,shouldRender,viewModel,valueInput);
    currRender(currTemplate);
};

export default {
    init,
    getView
};

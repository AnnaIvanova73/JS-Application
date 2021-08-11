import get from './createTemplate.js';
import {ifIsInvalidThrow} from '../../utils/verifications.js';

let viewModel = {};
let currRouter = undefined;
let currRender = undefined;
let subjectService = undefined;


const init = (router, render, service1) => {
    currRouter = router;
    currRender = render;
    subjectService = service1;
};

const createRecord = async (e) => {
    e.preventDefault();
    let currFrom = e.currentTarget;
    let dataFrom = new FormData(currFrom);
    try {
        ifIsInvalidThrow([dataFrom.get('name'), dataFrom.get('description'), dataFrom.get('logoUrl')]);

        viewModel = {
            name: dataFrom.get('name'),
            description: dataFrom.get('description'),
            logoUrl: dataFrom.get('logoUrl')
        };

        await subjectService.createRecord(viewModel);
        currRouter.redirect('/allRecords');

    } catch (err) {
        let currTemplate = get.createTemplate(viewModel,err);
        currRender(currTemplate);
    } finally {
        currFrom.reset();
    }
};

const getView = async () => {
    viewModel.create = createRecord;
    let currTemplate = get.createTemplate(viewModel);
    currRender(currTemplate);
};

export default {
    init,
    getView
};
import get from './createTemplate.js';
import {ifIsInvalidThrow} from '../../utils/verifications.js';

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

const createRecord = async (e) => {
    e.preventDefault();
    let currFrom = e.currentTarget;

    try {
        let dataFrom = new FormData(currFrom);

        ifIsInvalidThrow([
            dataFrom.get('title'),
            dataFrom.get('description'),
            dataFrom.get('imageUrl'),
            dataFrom.get('type')
        ]);

        viewModel = {
            title:dataFrom.get('title').trim(),
            description:dataFrom.get('description').trim(),
            imageUrl: dataFrom.get('imageUrl').trim(),
            type: dataFrom.get('type').trim(),
        };

        await subjectService.createRecord(viewModel);
        currRouter.redirect('/allRecords');

    } catch ( err ) {

        alert(err);

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
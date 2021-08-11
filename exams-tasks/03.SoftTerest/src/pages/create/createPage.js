import get from './createTemplate.js';
import {ifIsInvalidThrow, isPositiveNumber} from '../../utils/verifications.js';

let viewModel = undefined;
let currRouter = undefined;
let currRender = undefined;
let subjectService = undefined;
let authService = undefined;


const init = (router, render, service1,service12) => {
    currRouter = router;
    currRender = render;
    authService = service1;
    subjectService = service12;
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
            dataFrom.get('imageURL'),

        ]);

        viewModel = {
            title:dataFrom.get('title').trim(),
            description: dataFrom.get('description').trim(),
            img: dataFrom.get('imageURL').trim(),
            creator:authService.getEmail(),
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
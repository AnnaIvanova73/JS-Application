import get from './createTemplate.js';
import {ifIsInvalidThrow} from '../../utils/verifications.js';

let viewModel = undefined;
let currRouter = undefined;
let currRender = undefined;
let subjectService = undefined;
let displayNotification = undefined;

const init = (router, render, service1, notificationsRenderer) => {
    currRouter = router;
    currRender = render;
    subjectService = service1;
    displayNotification = notificationsRenderer;
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
            dataFrom.get('imageUrl')
        ]);

        viewModel = {
            title: dataFrom.get('title'),
            description: dataFrom.get('description'),
            imageUrl: dataFrom.get('imageUrl')
        };

        await subjectService.createRecord(viewModel);
        currRouter.redirect('/allRecords');

    } catch ( err ) {
        displayNotification(err);
        (err);

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
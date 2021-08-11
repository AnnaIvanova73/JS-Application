import get from '../templates/createTemplate.js';
import {ifIsInvalidThrow} from '../utils/verifications.js';

let viewModel = {};
let currRouter = undefined;
let currRender = undefined;
let subjectService = undefined;
let getNotifications = undefined

const init = (router, render, service1,notFunc) => {
    currRouter = router;
    currRender = render;
    subjectService = service1;
    getNotifications = notFunc;
};

const createRecord = async (e) => {
    e.preventDefault();
    let currFrom = e.currentTarget;
    let dataFrom = new FormData(currFrom);
    try {
        ifIsInvalidThrow([dataFrom.get('title'), dataFrom.get('description'), dataFrom.get('imageUrl')]);

        viewModel = {
            title: dataFrom.get('title'),
            description: dataFrom.get('description'),
            imageUrl: dataFrom.get('imageUrl')
        };

        await subjectService.createRecord(viewModel);
        currRouter.redirect('/meme-feed');

    } catch ( err ) {
        getNotifications(err);
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
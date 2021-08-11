import editTemplate from '../templates/editTemplate.js';
import {ifIsInvalidThrow} from '../utils/verifications.js';

let viewModel = {};
let currRouter = undefined;
let currRender = undefined;
let authService = undefined;
let subjectService = undefined;
let idRecord = undefined;
let getNotifications = undefined;


const init = (router, render,service1, service2,notFunc) => {
    currRouter = router;
    currRender = render;
    authService = service1;
    subjectService = service2;
    idRecord = undefined;
    getNotifications = notFunc;
};

const createRecord = async (e,idRecord) => {
    e.preventDefault();
    const currId = idRecord;
    let currFrom = e.currentTarget;
    let dataFrom = new FormData(currFrom);
    try {

        ifIsInvalidThrow([dataFrom.get('title'), dataFrom.get('description'), dataFrom.get('imageUrl')]);

        viewModel = {
            title: dataFrom.get('title'),
            description: dataFrom.get('description'),
            imageUrl: dataFrom.get('imageUrl')
        };

        await subjectService.updateRecord(currId,viewModel);
        currRouter.redirect('/meme-feed');

    } catch ( err ) {
        getNotifications(err);
    } finally {
        currFrom.reset();
    }
};

const getDataFromServer = async () => {
    return await subjectService.getRecord(idRecord);
};

const getView = async (context) => {
    idRecord = context.params.id;
    let data = await getDataFromServer(idRecord);

    viewModel = {
        description: data.description,
        imageUrl: data.imageUrl,
        title:data.title,
        idRecord: data._id,
    }
    viewModel.createRecord = createRecord;

    let currTemplate = editTemplate.edit(viewModel);
    currRender(currTemplate);
};

export default {
    init,
    getView
};
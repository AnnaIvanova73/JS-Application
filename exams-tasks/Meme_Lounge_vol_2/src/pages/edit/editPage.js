import editTemplate from './editTemplate.js';
import {ifIsInvalidThrow} from '../../utils/verifications.js';

let idRecord;
let viewModel = undefined;
let currRouter = undefined;
let currRender = undefined;
let authService = undefined;
let subjectService = undefined;
let displayNotification = undefined;


const init = (router, render,service1, service2,notificationsRenderer) => {
    currRouter = router;
    currRender = render;
    authService = service1;
    subjectService = service2;
    displayNotification = notificationsRenderer;
    viewModel = {};
    idRecord = undefined;

};

const createRecord = async (e,idRecord) => {
    e.preventDefault();
    const currId = idRecord;
    let currFrom = e.currentTarget;
    let dataFrom = new FormData(currFrom);

    try {
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

        await subjectService.updateRecord(currId,viewModel);
        currRouter.redirect('/allRecords');

    } catch ( err ) {
        displayNotification(err);

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
    };
    viewModel.createRecord = createRecord;

    let currTemplate = editTemplate.edit(viewModel);
    currRender(currTemplate);
};

export default {
    init,
    getView
};
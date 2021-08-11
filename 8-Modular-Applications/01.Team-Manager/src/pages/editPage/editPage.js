import editTemplate from './editTemplate.js';
import {ifIsInvalidThrow} from '../../utils/verifications.js';

let viewModel = {};
let currRouter = undefined;
let currRender = undefined;
let authService = undefined;
let subjectService = undefined;
let idRecord = undefined;



const init = (router, render,service1, service2) => {
    currRouter = router;
    currRender = render;
    authService = service1;
    subjectService = service2;
    idRecord = undefined;

};

const createRecord = async (e,idRecord) => {
    e.preventDefault();
    const currId = idRecord;
    let currFrom = e.currentTarget;
    let dataFrom = new FormData(currFrom);
    try {

        ifIsInvalidThrow([dataFrom.get('name'), dataFrom.get('description'), dataFrom.get('logoUrl')]);

        viewModel = {
            name: dataFrom.get('name'),
            description: dataFrom.get('description'),
            logoUrl: dataFrom.get('logoUrl')
        };

        await subjectService.updateRecord(currId,viewModel);
        currRouter.redirect('/allRecords');

    } catch (err) {
        let currTemplate = editTemplate.edit(viewModel,err);
        currRender(currTemplate);
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
        logoUrl: data.logoUrl,
        name:data.name,
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
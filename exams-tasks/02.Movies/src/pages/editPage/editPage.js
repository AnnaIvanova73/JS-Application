import editTemplate from './editTemplate.js';
import {ifIsInvalidThrow, isPositiveNumber} from "../../utils/verifications.js";

let viewModel = {};
let currRouter = undefined;
let currRender = undefined;
let authService = undefined;
let subjectService = undefined;
let idRecord = undefined;
let notify = undefined;

const init = (router, render, service1, service2, callbackNotification) => {
    currRouter = router;
    currRender = render;
    authService = service1;
    subjectService = service2;
    notify = callbackNotification;
    idRecord = undefined;

};


const createRecord = async (e, idRecord) => {
    e.preventDefault();
    const currId = idRecord;
    let currFrom = e.currentTarget;
    let dataFrom = new FormData(currFrom);
    try {

        ifIsInvalidThrow([
            dataFrom.get('title'),
            dataFrom.get('description'),
            dataFrom.get('imageUrl'),

        ]);


        viewModel = {
            title: dataFrom.get('title'),
            description: dataFrom.get('description'),
            img: dataFrom.get('imageUrl'),
        };
        await subjectService.updateRecord(currId, viewModel);
        currRouter.redirect(`/details/${idRecord}`);
        console.log(notify)
        notify(`Eddited successfully`,true);
        currFrom.reset();
    } catch ( err ) {
        notify(err,false);
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
        img: data.img,
        title: data.title,
        createRecord,
        _id:data._id
    };
    viewModel.createRecord = createRecord;
    let currTemplate = editTemplate.edit(viewModel);
    currRender(currTemplate);
};

export default {
    init,
    getView
};
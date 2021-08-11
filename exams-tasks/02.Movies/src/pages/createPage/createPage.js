import get from './createTemplate.js';
import {ifIsInvalidThrow} from "../../utils/verifications.js";
import {isPositiveNumber} from "../../utils/verifications.js";

let viewModel;
let currRouter = undefined;
let currRender = undefined;
let subjectService = undefined;
let notificaitons = undefined;
const init = (router, render, service1,callbackNotification) => {
    currRouter = router;
    currRender = render;
    subjectService = service1;
    notificaitons=callbackNotification;
    viewModel = {};
};

const createRecord = async (e) => {
    e.preventDefault();
    let currFrom = e.currentTarget;
    let dataFrom = new FormData(currFrom);
    try {
        ifIsInvalidThrow([
            dataFrom.get('title'),
            dataFrom.get('description'),
            dataFrom.get('imageUrl'),

        ]);


        viewModel = {
            title:  dataFrom.get('title'),
            description: dataFrom.get('description'),
            img: dataFrom.get('imageUrl'),
        };

        let data = await subjectService.createRecord(viewModel);
        notificaitons(`Created successfully!`,true);
        currRouter.redirect(`/home`);
        currFrom.reset();
    } catch ( err ) {
        notificaitons(err,false)
    }
};

const getView = async () => {
    viewModel['createRecord'] = createRecord;
    let currTemplate = get.createTemplate(viewModel);
    currRender(currTemplate);
};

export default {
    init,
    getView
};
import get from './createTemplate.js';
import {ifIsInvalidThrow,isValidCategory} from '../../utils/verifications.js';

let viewModel = undefined;
let currRouter = undefined;
let currRender = undefined;
let authService = undefined;
let subjectService = undefined;


const init = (router, render, service1,service2) => {
    currRouter = router;
    currRender = render;
    authService = service1;
    subjectService = service2;
    viewModel = {};
};

const createRecord = async (e) => {
    e.preventDefault();
    let currFrom = e.currentTarget;

    try {
        let dataFrom = new FormData(currFrom);

        ifIsInvalidThrow([
            dataFrom.get('title'),
            dataFrom.get('category'),
            dataFrom.get('content'),
        ]);

        isValidCategory(dataFrom.get('category').trim());

        viewModel = {
            title:dataFrom.get('title').trim(),
            category:dataFrom.get('category').trim(),
            content: dataFrom.get('content').trim(),
            "creator-email": authService.getEmail(),
        };

        let data = await subjectService.createRecord(viewModel);
        console.log(data)
        currRouter.redirect('/home');

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
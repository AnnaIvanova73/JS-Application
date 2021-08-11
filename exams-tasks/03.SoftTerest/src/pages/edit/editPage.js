import editTemplate from './editTemplate.js';
import {ifIsInvalidThrow} from '../../utils/verifications.js';
import {isPositiveNumber} from "../../utils/verifications.js";

let idRecord;
let viewModel = undefined;
let currRouter = undefined;
let currRender = undefined;
let authService = undefined;
let subjectService = undefined;

const init = (router, render,service1, service2) => {
    currRouter = router;
    currRender = render;
    authService = service1;
    subjectService = service2;
    idRecord = undefined;
    viewModel = {};
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
            dataFrom.get('imageURL'),
        ]);


        viewModel = {
            title:dataFrom.get('title').trim(),
            description: dataFrom.get('description').trim(),
            img: dataFrom.get('imageURL').trim(),
            creator:authService.getEmail(),
        };

        await subjectService.updateRecord(currId,viewModel);
        currRouter.redirect(`/details/${currId}`);

    } catch ( err ) {
        alert(err);

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
        title:data.title,
        description: data.description,
        imageUrl: data.img,
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
import editTemplate from './editTemplate.js';
import {ifIsInvalidThrow} from '../../utils/verifications.js';

let viewModel = undefined;
let currRouter = undefined;
let currRender = undefined;
let authService = undefined;
let subjectService = undefined;
let idRecord;

const init = (router, render, service1, service2) => {
    currRouter = router;
    currRender = render;
    authService = service1;
    subjectService = service2;
    viewModel = {};
    idRecord = undefined;
};

const editRecord = async (e) => {

    e.preventDefault();
    const currId = idRecord;

    let currFrom = e.currentTarget;

    try {

        let dataFrom = new FormData(currFrom);

        ifIsInvalidThrow([
            dataFrom.get('title'),
            dataFrom.get('description'),
            dataFrom.get('img'),
            dataFrom.get('price'),
            dataFrom.get('brand')
        ]);

        viewModel = {
            title: dataFrom.get('title'),
            description: dataFrom.get('description'),
            img: dataFrom.get('img'),
            price: dataFrom.get('price'),
            brand: dataFrom.get('brand'),
            buyers: []
        };

        await subjectService.updateRecord(currId, viewModel);
        currRouter.redirect(`/details/${idRecord}`);

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
        title: data.title,
        img: data.img,
        description: data.description,
        _id: data._id,
        price: data.price,
        brand: data.brand,
        editRecord,
    };

    let currTemplate = editTemplate.edit(viewModel);
    currRender(currTemplate);
};

export default {
    init,
    getView
};
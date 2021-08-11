import editTemplate from '../templates/editTemplate.js';
import {ifIsInvalidThrow} from '../utils/verifications.js';
import {isPositiveNumber} from '../utils/verifications.js';

let viewModel = {};
let currRouter = undefined;
let currRender = undefined;
let authService = undefined;
let subjectService = undefined;
let idRecord = undefined;
const init = (router, render, service1, service2) => {
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

        ifIsInvalidThrow([
            dataFrom.get('brand'),
            dataFrom.get('model'),
            dataFrom.get('description'),
            dataFrom.get('year'),
            dataFrom.get('imageUrl'),
            dataFrom.get('price'),
        ]);

        const year = Number(dataFrom.get('year'));
        const price = Number(dataFrom.get('price'));

        isPositiveNumber([year,price])
        viewModel = {
            brand:dataFrom.get('brand'),
            model:dataFrom.get('model'),
            description:dataFrom.get('description'),
            year:year,
            imageUrl: dataFrom.get('imageUrl'),
            price: price,
        };

        await subjectService.updateRecord(currId,viewModel);
        currRouter.redirect('/allRecords');

    } catch ( err ) {
        console.log(err);
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
        brand:data.brand,
        model:data.model,
        description:data.description,
        year:data.year,
        imageUrl: data.imageUrl,
        price: data.price,
        _id:data._id,
    }
    viewModel.createRecord = createRecord;

    let currTemplate = editTemplate.edit(viewModel);
    currRender(currTemplate);
};

export default {
    init,
    getView
};
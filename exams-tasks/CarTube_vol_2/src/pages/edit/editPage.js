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
            dataFrom.get('brand'),
            dataFrom.get('model'),
            dataFrom.get('description'),
            dataFrom.get('year'),
            dataFrom.get('imageUrl'),
            dataFrom.get('price')
        ]);

        const year = Number( dataFrom.get('year').trim());
        const price = Number(dataFrom.get('price').trim());

        isPositiveNumber([
            year,
            price
        ]);
        viewModel = {
            brand:dataFrom.get('brand').trim(),
            model:dataFrom.get('model').trim(),
            description: dataFrom.get('description').trim(),
            year,
            imageUrl: dataFrom.get('imageUrl').trim(),
            price
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
        brand:data.brand,
        model:data.model,
        description: data.description,
        year: data.year,
        imageUrl: data.imageUrl,
        price: data.price,
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
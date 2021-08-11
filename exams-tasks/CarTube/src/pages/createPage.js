import get from '../templates/createTemplate.js';
import {ifIsInvalidThrow} from '../utils/verifications.js';
import {isPositiveNumber} from '../utils/verifications.js';

let viewModel = {};
let currRouter = undefined;
let currRender = undefined;
let subjectService = undefined;

const init = (router, render, service1) => {
    currRouter = router;
    currRender = render;
    subjectService = service1;
};

const createRecord = async (e) => {
    e.preventDefault();
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

        let data = await subjectService.createRecord(viewModel);
        currRouter.redirect(`/allRecords`);

    } catch ( err ) {
        console.log(err);
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
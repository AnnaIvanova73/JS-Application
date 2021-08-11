import get from './createTemplate.js';
import {ifIsInvalidThrow, isPositiveNumber} from '../../utils/verifications.js';

let viewModel = undefined;
let currRouter = undefined;
let currRender = undefined;
let subjectService = undefined;


const init = (router, render, service1) => {
    currRouter = router;
    currRender = render;
    subjectService = service1;
    viewModel = {};
};

const createRecord = async (e) => {
    e.preventDefault();
    let currFrom = e.currentTarget;

    try {
        let dataFrom = new FormData(currFrom);

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

        await subjectService.createRecord(viewModel);
        currRouter.redirect('/allRecords');

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
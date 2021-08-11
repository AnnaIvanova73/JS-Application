import createTemplate from './createTemplate.js';
import {ifIsInvalidThrow} from '../../utils/verifications.js';

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
            peopleBoughtIt:[]
        };

        let data = await subjectService.createRecord(viewModel);
        currRouter.redirect('/allRecords');

    } catch ( err ) {

        alert(err);

    } finally {

        currFrom.reset();
    }
};

const getView = async () => {
    viewModel.createRecord = createRecord;
    let currTemplate = createTemplate.create(viewModel);
    currRender(currTemplate);
};

export default {
    init,
    getView
};
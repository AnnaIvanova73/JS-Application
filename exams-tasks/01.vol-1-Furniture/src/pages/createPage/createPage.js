import get from './createTemplate.js';
import {ifIsInvalidThrow} from "../../utils/verifications.js";
import {isPositiveNumber} from "../../utils/verifications.js";

let viewModel;
let currRouter = undefined;
let currRender = undefined;
let subjectService = undefined;
let controlClassesInputFields = undefined;
const init = (router, render, service1, moduleFields) => {
    currRouter = router;
    currRender = render;
    subjectService = service1;
    controlClassesInputFields = moduleFields;
    viewModel = {};
};

const createRecord = async (e) => {
    e.preventDefault();
    let currFrom = e.currentTarget;
    let dataFrom = new FormData(currFrom);
    try {
        ifIsInvalidThrow([
            dataFrom.get('description'),
            dataFrom.get('img'),
            dataFrom.get('make'),
            dataFrom.get('model'),
            dataFrom.get('year'),
            dataFrom.get('price'),
            dataFrom.get('material'),
        ]);

        const year = Number(dataFrom.get('year'));
        const price = Number(dataFrom.get('price'));

        viewModel = {
            make: dataFrom.get('make'),
            model: dataFrom.get('model'),
            year: dataFrom.get('year'),
            description: dataFrom.get('description'),
            price: dataFrom.get('price'),
            img: dataFrom.get('img'),
            material: dataFrom.get('material'),
        };

        let data = await subjectService.createRecord(viewModel);
        currRouter.redirect(`/home`);
        currFrom.reset();
    } catch ( err ) {
        alert(err);
    }
};

const getView = async () => {
    viewModel = {
        descrLimit: 10,
        makeModelLimit: 4,
        startYear: 1950,
        endYear: 2050,
        controlClassesInputFields,
        createRecord
    };
    let currTemplate = get.createTemplate(viewModel);
    currRender(currTemplate);
};

export default {
    init,
    getView
};
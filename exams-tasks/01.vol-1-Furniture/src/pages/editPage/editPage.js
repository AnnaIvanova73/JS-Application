import editTemplate from './editTemplate.js';
import {ifIsInvalidThrow, isPositiveNumber} from "../../utils/verifications.js";

let viewModel = {};
let currRouter = undefined;
let currRender = undefined;
let authService = undefined;
let subjectService = undefined;
let idRecord = undefined;
let controlClassesInputFields = undefined;
const init = (router, render, service1, service2, modul) => {
    currRouter = router;
    currRender = render;
    authService = service1;
    subjectService = service2;
    controlClassesInputFields = modul;
    idRecord = undefined;
};


const createRecord = async (e, idRecord) => {
    e.preventDefault();
    const currId = idRecord;
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
        await subjectService.updateRecord(currId, viewModel);
        currRouter.redirect(`/details/${idRecord}`);
        currFrom.reset();
    } catch ( err ) {
        alert(err);
    }
};

const getDataFromServer = async () => {
    return await subjectService.getRecord(idRecord);
};

const getView = async (context) => {
    idRecord = context.params.id;
    let data = await getDataFromServer(idRecord);
    viewModel = {
        description: data.description,
        img: data.img,
        make: data.make,
        model: data.model,
        material: data.material,
        price: data.price,
        year: data.year,
        _id: data._id,
        descrLimit: 10,
        makeModelLimit: 4,
        startYear: 1950,
        endYear: 2050,
        controlClassesInputFields
    };
    viewModel.createRecord = createRecord;
    let currTemplate = editTemplate.edit(viewModel);
    currRender(currTemplate);
};

export default {
    init,
    getView
};
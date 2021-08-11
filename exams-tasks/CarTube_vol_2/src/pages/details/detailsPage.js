import detailsTemplate from './detailsTemplate.js';

let viewModel = {};
let currRouter = undefined;
let currRender = undefined;
let authService = undefined;
let subjectService = undefined;
let deleteFunc = undefined;

const init = (router, render, service1, service2,callback) => {
    currRouter = router;
    currRender = render;
    authService = service1;
    subjectService = service2;
    deleteFunc = callback;
};

const getView = async (context) => {
    const idRecord = context.params.id;
    try {
        let data = await subjectService.getRecord(idRecord);
        const isOwner = Boolean(data._ownerId === authService.getUserId());

        viewModel = {
            brand:data.brand,
            model:data.model,
            description: data.description,
            year: data.year,
            imageUrl: data.imageUrl,
            price: data.price,
            idRecord: data._id,
            isOwner,
            delRecord:deleteFunc
        };

    } catch ( err ) {
        console.log(err);
    }
    console.log(viewModel);
    let currTemplate = detailsTemplate.getTemplate(viewModel);
    currRender(currTemplate);
};

export default {
    init,
    getView
};

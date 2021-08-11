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
            description:data.description,
            img: data.img,
            make:data.make,
            model:data.model,
            material:data.material,
            price: data.price,
            year: data.year,
            _id:data._id,
            isOwner,
            deleteRecord:deleteFunc
        };

    } catch ( err ) {
        console.log(err);
    }
    let currTemplate = detailsTemplate.getTemplate(viewModel);
    currRender(currTemplate);
};

export default {
    init,
    getView
};

import detailsTemplate from './detailsTemplate.js';

let viewModel = {};
let currRouter = undefined;
let currRender = undefined;
let authService = undefined;
let subjectService = undefined;
let specificsService = undefined;
let deleteFunc = undefined;
let likeFunc = undefined;

const init = (router, render, service1, service2, service3, callbackDel, callbackLike) => {
    currRouter = router;
    currRender = render;
    authService = service1;
    subjectService = service2;
    specificsService = service3;
    deleteFunc = callbackDel;
    likeFunc = callbackLike;
};

const getView = async (context) => {
    const idRecord = context.params.id;
    try {
        let data = await subjectService.getRecord(idRecord);
        const isOwner = Boolean(data._ownerId === authService.getUserId());

        const moviesLikes = await specificsService.getMovieTotalLikes(data._id);
        const likeUser = await specificsService.getUserLikeForMovie(authService.getUserId(), data._id);
        let hasLiked = likeUser.length > 0;
        viewModel = {
            title: data.title,
            description: data.description,
            img: data.img,
            _id: data._id,
            hasLiked,
            moviesLikes: moviesLikes.length,
            isOwner,
            deleteRecord: deleteFunc,
            likeRecord:likeFunc,
        };
            console.log(viewModel)
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

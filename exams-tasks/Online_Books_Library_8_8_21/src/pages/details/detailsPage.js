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

        const isLoggedIn = authService.isLoggedIn();

        let likes = 0;

        try {
            likes = await specificsService.getTotalLikes(data._id);
        }catch ( err ) {
            console.log(err)
        }

        let hasLiked = false;

        try {
            const likeUser = await specificsService.getUserLikesPerRecord(authService.getUserId(), data._id);
            hasLiked = likeUser > 0;
        } catch ( err ) {
            console.log(err)
        }


        viewModel = {
            title: data.title,
            description: data.description,
            imageUrl: data.imageUrl,
            type: data.type,
            idRecord: data._id,
            delRecord: deleteFunc,
            likeRecord: likeFunc,
            totalLikes: likes,
            isOwner,
            isLoggedIn,
            hasLiked,
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

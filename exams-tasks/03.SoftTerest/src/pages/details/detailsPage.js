import detailsTemplate from './detailsTemplate.js';

let viewModel = {};
let currRouter = undefined;
let currRender = undefined;
let authService = undefined;
let subjectService = undefined;
let specificsService = undefined;
let deleteFunc = undefined;
let likeFunc = undefined;
let commentFunc = undefined;

const init = (router, render, service1, service2,service3,callbackDel,callbackLike,callbackComment) => {
    currRouter = router;
    currRender = render;
    authService = service1;
    subjectService = service2;
    specificsService = service3;
    deleteFunc = callbackDel;
    likeFunc = callbackLike;
    commentFunc = callbackComment;
};

const getView = async (context) => {
    const idRecord = context.params.id;

    try {
        let data = await subjectService.getRecord(idRecord);
        const isOwner = Boolean(data._ownerId === authService.getUserId());
        const isLoggedIn = authService.isLoggedIn();

        const likes = await specificsService.getTotalLikes(data._id);
        const comments = await specificsService.getTotalComments(data._id);

        viewModel = {
            title:data.title,
            description: data.description,
            imageUrl: data.img,
            idRecord:data._id,
            isOwner,
            totalLikes:likes.length,
            totalComments:comments.length,
            delRecord:deleteFunc,
            likeRecord:likeFunc,
            commentRecord:commentFunc,
            data:comments,
            isLoggedIn,
            username:authService.getUsername(),
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

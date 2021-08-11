let currRouter = undefined;
let specificsService = undefined;
let notificaitons = undefined;

const init = (router,service1,callbackNotification) => {
    currRouter = router;
    specificsService = service1;
    notificaitons=callbackNotification;
};

const likeRecord = async (idRecord) => {
    try {
        await specificsService.likeRecord({movieId: idRecord});
        notificaitons(`Liked successfully`,true);
        currRouter.redirect(`/details/${idRecord}`);
    } catch ( err ) {
        notificaitons(err.message,false)
    }
};

export default {
    likeRecord, init
};
let currRouter = undefined;
let specificsService = undefined;


const init = (router,service1,) => {
    currRouter = router;
    specificsService = service1;

};

const likeRecord = async (idRecord) => {
    try {
        await specificsService.likeRecord({recordId: idRecord});
        currRouter.redirect(`/details/${idRecord}`);
    } catch ( err ) {
        console.log(err.message,false)
    }
};

export default {
    likeRecord, init
};
let currRouter = undefined;
let specificsService = undefined;


const init = (router,service1,) => {
    currRouter = router;
    specificsService = service1;

};

const commentRecord = async (e,idRecord,username) => {
    e.preventDefault();
    let form = e.currentTarget;
    let formData = new FormData(form);

    try {
        let comment =  `${username}: ${formData.get('newComment').trim()}`
        await specificsService.commentOnRecord({recordId: idRecord,content:comment});
        currRouter.redirect(`/details/${idRecord}`);
    } catch ( err ) {
        console.log(err.message,false)
    }finally{
        form.reset();
    }
};

export default {
    commentRecord, init
};
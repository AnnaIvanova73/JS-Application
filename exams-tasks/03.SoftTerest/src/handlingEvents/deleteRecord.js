let currRouter = undefined;
let subjectService = undefined;

const init = (router,service1) =>{
    currRouter = router;
    subjectService = service1
};

const delRecord = async (idRecord) => {
    try {
        await subjectService.deleteRecord(idRecord);
        currRouter.redirect('/home');

    } catch ( err ) {

        console.log(err);

    }
};

export default {
    delRecord, init
};
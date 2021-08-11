import subjectService from '../services/subjectActionService.js';

let currRouter = undefined;
const init = (router) => currRouter = router;

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
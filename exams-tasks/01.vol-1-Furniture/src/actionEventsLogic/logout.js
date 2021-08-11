import authService from '../services/authService.js';

let currRouter = undefined;
const init = (router) => currRouter = router;

const getView = async () => {
    try{
        await authService.logout();
        currRouter.redirect('/home');
    }catch(err){
        console.log(err);
        currRouter.redirect('/allRecords');
    }
};

export default {
    getView, init
};
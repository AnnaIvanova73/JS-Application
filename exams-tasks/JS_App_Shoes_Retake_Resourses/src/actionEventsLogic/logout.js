let currRouter = undefined;
let authService = undefined;


const init = (router, service1) => {
    currRouter = router;
    authService = service1;

};

const getView = async () => {
    try {
        await authService.logout();
        currRouter.redirect('/home');
    } catch ( err ) {
        console.log(err);
        currRouter.redirect('/allRecords');
    }
};

export default {
    getView, init
};
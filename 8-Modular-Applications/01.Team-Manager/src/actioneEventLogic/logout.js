let currRouter = undefined;
let authService = undefined;
let modalCall = undefined;
const init = (router, service1,callbackModal) => {
    currRouter = router;
    authService = service1;
    modalCall = callbackModal;
};

const getView = async () => {
    try {
        let result = await modalCall(`Are you sure you want to leave?`);

        if(result){
            await authService.logout();
            currRouter.redirect('/home');
        }

    } catch ( err ) {
        console.log(err);
        currRouter.redirect('allRecords');
    }
};

export default {
    getView, init
};
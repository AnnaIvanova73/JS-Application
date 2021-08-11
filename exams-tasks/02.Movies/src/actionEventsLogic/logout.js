let currRouter = undefined;
let authService = undefined;
let notificaitons = undefined;

const init = (router, service1,callbackNotification) => {
    currRouter = router;
    authService = service1;
    notificaitons=callbackNotification;
};

const getView = async () => {
    try {
        await authService.logout();
        notificaitons(`Successful logout`,true);
        currRouter.redirect('/home');
    } catch ( err ) {
        console.log(err);
        notificaitons(err.message,false);
        currRouter.redirect('/allRecords');
    }
};

export default {
    getView, init
};
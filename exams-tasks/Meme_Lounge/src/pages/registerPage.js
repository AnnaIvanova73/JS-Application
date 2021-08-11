import {getFormDataLog} from "../utils/verifications.js";
import registerTemplate from "../templates/registerTemplate.js";

let viewModel = {};
let currRouter = undefined;
let currRender = undefined;
let authService = undefined;
let getNotifications = undefined;

const init = (router, render, service1,notFunc) => {
    currRouter = router;
    currRender = render;
    authService = service1;
    getNotifications = notFunc;
};

const regUser = async (e) => {
    e.preventDefault();
    let form = e.currentTarget;

    try {
        let currForm = new FormData(form);
        let data = getFormDataLog([
            currForm.get('email'),
            currForm.get('password'),
            currForm.get('repeatPass'),
            currForm.get('username'),
            currForm.get('gender'),
        ]);
        data.gender = currForm.get('gender');
        data.username = currForm.get('username');
        await authService.regUser(data);
        currRouter.redirect('meme-feed');
    } catch ( err ) {
        getNotifications(err);
    } finally {
        form.reset();
    }
};

const getView = () => {
    viewModel.reg = regUser;
    let currTemplate = registerTemplate.register(viewModel);
    currRender(currTemplate);
};
export default {
    getView,
    init
};
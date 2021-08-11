import {getFormDataLog} from "../../utils/verifications.js";
import loginTemplate from "./loginTemplate.js";

let viewModel = {};
let currRouter = undefined;
let currRender = undefined;
let authService = undefined;
let notificaitons = undefined;
const init = (router, render, service1,callbackNotification) => {
    currRouter = router;
    currRender = render;
    authService = service1;
    notificaitons=callbackNotification;
};

const loggUser = async (e) => {
    e.preventDefault();
    let form = e.currentTarget;

    try {
        let currForm = new FormData(form);
        let data = getFormDataLog([currForm.get('email'), currForm.get('password')]);
        await authService.logUser(data);
        notificaitons(`Login successful.`,true);
        currRouter.redirect('/home');
    } catch ( err ) {
        notificaitons(err,false)
    } finally {
        form.reset();
    }
};

const getView = () => {
    viewModel.logg = loggUser;
    let currTemplate = loginTemplate.login(viewModel);
    currRender(currTemplate);
};
export default {
    getView,
    init
};
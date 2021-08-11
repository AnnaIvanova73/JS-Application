import {getFormDataLog} from "../../utils/verifications.js";
import registerTemplate from "./registerTemplate.js";

let viewModel = {};
let currRouter = undefined;
let currRender = undefined;
let authService = undefined;
let notificaitons = undefined;
const init = (router, render, service1,  callbackNotification) => {
    currRouter = router;
    currRender = render;
    authService = service1;
    notificaitons=callbackNotification;
};

const regUser = async (e) => {
    e.preventDefault();
    let form = e.currentTarget;
    console.log(form);
    try {
        let currForm = new FormData(form);
        let data = getFormDataLog([ currForm.get('email'),
            currForm.get('password'),
            currForm.get('repeatPassword'),
        ]);

        await authService.regUser(data);
        notificaitons(`Successful registration!`,true);
        currRouter.redirect('/home');
    } catch ( err ) {
        notificaitons(err,false);
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
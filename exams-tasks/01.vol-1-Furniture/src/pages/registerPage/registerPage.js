import {getFormDataLog} from "../../utils/verifications.js";
import registerTemplate from "./registerTemplate.js";

let viewModel = {};
let currRouter = undefined;
let currRender = undefined;
let authService = undefined;

const init = (router, render, service1) => {
    currRouter = router;
    currRender = render;
    authService = service1;
};

const regUser = async (e) => {
    e.preventDefault();
    let form = e.currentTarget;
    console.log(form);
    try {
        let currForm = new FormData(form);
        let data = getFormDataLog([ currForm.get('email'),
            currForm.get('password'),
            currForm.get('rePass'),
        ]);

        await authService.regUser(data);
        currRouter.redirect('/home');
    } catch ( err ) {
        alert(err);
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
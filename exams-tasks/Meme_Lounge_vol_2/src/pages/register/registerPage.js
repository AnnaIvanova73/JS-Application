import {getFormDataLog, ifIsInvalidThrow} from "../../utils/verifications.js";
import registerTemplate from "./registerTemplate.js";

let viewModel = undefined;
let currRouter = undefined;
let currRender = undefined;
let authService = undefined;
let displayNotification = undefined;

const init = (router, render, service1, notificationsRenderer) => {
    currRouter = router;
    currRender = render;
    authService = service1;
    displayNotification = notificationsRenderer;
    viewModel = {};

};

const regUser = async (e) => {
    e.preventDefault();
    let form = e.currentTarget;

    try {
        let currForm = new FormData(form);
        ifIsInvalidThrow([
            currForm.get('email'),
            currForm.get('password'),
            currForm.get('repeatPass'),
            currForm.get('username'),
            currForm.get('gender'),
        ]);
        let data = getFormDataLog([
            currForm.get('email'),
            currForm.get('password'),
            currForm.get('repeatPass'),
            currForm.get('username'),
            currForm.get('gender'),
        ]);

        data.username = currForm.get('username');
        data.gender = currForm.get('gender');

        await authService.regUser(data);
        currRouter.redirect(`/allRecords`);

    } catch ( err ) {

        displayNotification(err);

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
    init,
    getView
};
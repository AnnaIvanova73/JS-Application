import {getFormDataLog,ifIsInvalidThrow} from "../../utils/verifications.js";
import loginTemplate from "./loginTemplate.js";

let viewModel = undefined;
let currRouter = undefined;
let currRender = undefined;
let authService = undefined;
let displayNotification = undefined;

const init = (router, render, service1,notificationRenderer) => {
    currRouter = router;
    currRender = render;
    authService = service1;
    displayNotification = notificationRenderer;
    viewModel = {};
};

const loggUser = async (e) => {
    e.preventDefault();
    let form = e.currentTarget;

    try {
        let currForm = new FormData(form);

        ifIsInvalidThrow([currForm.get('email'), currForm.get('password')]);
        let data = getFormDataLog([currForm.get('email'), currForm.get('password')]);

        await authService.logUser(data);
        currRouter.redirect('/allRecords');

    } catch ( err ) {

        displayNotification(err);

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
    init,
    getView

};
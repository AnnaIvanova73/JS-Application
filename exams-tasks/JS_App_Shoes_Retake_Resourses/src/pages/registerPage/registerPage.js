import {getFormDataLog, ifIsInvalidThrow} from "../../utils/verifications.js";
import registerTemplate from "./registerTemplate.js";
const LIMIT_PASSWORDS = 6;


let viewModel = undefined;
let currRouter = undefined;
let currRender = undefined;
let authService = undefined;


const init = (router, render, service1) => {
    currRouter = router;
    currRender = render;
    authService = service1;
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
            currForm.get('repeatPass')
        ]);
        let data = getFormDataLog([
            currForm.get('email'),
            currForm.get('password'),
            currForm.get('repeatPass')
        ],LIMIT_PASSWORDS);

        await authService.regUser(data);
        currRouter.redirect(`/allRecords`);

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
    init,
    getView
};
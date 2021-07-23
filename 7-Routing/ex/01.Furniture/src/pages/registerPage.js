import {getFormDataLog} from "../utils/verifications.js";
import authService from "../services/authService.js";
import templates from "../templates/registerTemplate.js"
import nav from "../pages/nav.js";
export default function (context){
    nav.addActiveClass('registerLink');
    const registerUser = async (e) => {
        e.preventDefault();
        let form = e.currentTarget;

        try {
            let currForm = new FormData(form);
            let data = getFormDataLog([currForm.get('email'), currForm.get('password'), currForm.get('rePass')]);
            await authService.regUser(data,context);
        } catch (err) {
            alert(err)
        } finally {
            form.reset();
        }

    };

    templates.render(templates.renderRegisterTemplate(registerUser),document.querySelector('#root'));
}
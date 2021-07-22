import {getFormDataLog} from "../utils/verifications.js";
import authService from "../services/authService.js";
import catalogTemplate from "../templates/loginTemplate.js";


export default function (context){

    const loggUser = async (e) => {
        e.preventDefault();
        let form = e.currentTarget;

        try {
            let currForm = new FormData(form);
            let data = getFormDataLog([currForm.get('email'), currForm.get('password')]);
            await authService.logUser(data,context);
        } catch (err) {
            alert(err)
        } finally {
            form.reset();
        }

    };

    catalogTemplate.render(catalogTemplate.renderLoginTemplate(loggUser),document.querySelector('#root'));
};
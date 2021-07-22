import {getFormDataLog} from "../utils/verifications.js";
import authService from "../services/authService.js";
import templates from "../templates/editTemplate.js"

export default function (context){
    const registerUser = async (e) => {
        // e.preventDefault();
        // let form = e.currentTarget;
        //
        // try {
        //     let currForm = new FormData(form);
        //     let data = getFormDataLog([currForm.get('email'), currForm.get('password'), currForm.get('rePass')]);
        //     await authService.regUser(data,context);
        // } catch (err) {
        //     alert(err)
        // } finally {
        //     form.reset();
        // }

    };

    templates.render(templates.renderEditTemplate(context.page.id),document.querySelector('#root'));
}
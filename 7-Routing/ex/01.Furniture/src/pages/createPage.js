import templates from "../templates/createTemplate.js"
import {verifyAllDataFormFields} from "../utils/verifications.js";
import furnitureService from "../services/furnitureService.js";
import nav from "../pages/nav.js";



export default async function (context) {
    nav.addActiveClass('createLink');
    const createRecord = async (e) => {
        e.preventDefault();
        let currFrom = e.currentTarget;
        let dataFrom = new FormData(currFrom);
        try {
            let data = verifyAllDataFormFields(dataFrom);
            await furnitureService.createFurniture(data);
            context.page.redirect('/home');
        } catch (err) {
            console.log(err);
        } finally {
            currFrom.reset();
        }
    };

    templates.render(templates.renderCreateTemplate(createRecord,
        furnitureService.isValidYearFieldControl,furnitureService.isValidModelFieldControl), document.querySelector('#root'));
};
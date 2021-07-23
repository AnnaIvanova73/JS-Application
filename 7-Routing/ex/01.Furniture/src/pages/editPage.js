import {verifyAllDataFormFields} from "../utils/verifications.js";
import furnitureService from "../services/furnitureService.js";
import templates from "../templates/editTemplate.js";


export default async function (context) {
    const currId = context.params.id;

    let data = await furnitureService.getFurniture(currId);
    const editRecord = async (e) => {
        e.preventDefault();
        let currFrom = e.currentTarget;
        let dataFrom = new FormData(currFrom);
        try {
            let data = verifyAllDataFormFields(dataFrom);
            console.log(data);
            await furnitureService.updateFurniture(currId, data);
            context.page.redirect('/home');

        } catch (err) {
            console.log(err);
        } finally {
            currFrom.reset();
        }
    };
    templates.render(templates.renderEditTemplate(context.page.id, editRecord, data,
        furnitureService.isValidYearFieldControl,furnitureService.isValidModelFieldControl), document.querySelector('#root'));
};
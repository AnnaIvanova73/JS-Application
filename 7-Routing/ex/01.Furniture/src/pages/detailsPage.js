import catalogTemplate from "../templates/detailsTemplate.js";
import furnitureService from "../services/furnitureService.js";
import authService from "../services/authService.js";




const requestFurnitures = async (id) => {
    try {
        return await furnitureService.getFurniture(id);
    } catch (err) {
        alert(err);
    }
};


const getView = async (id) => {
    let data = await requestFurnitures(id);
    let isOwner = false;
    if (authService.isLoggedIn() && authService.getUserId() === data._ownerId) {
        isOwner = true;
    }
    catalogTemplate.render(catalogTemplate.renderDetailsTemplate(data, isOwner), document.querySelector('#root'));

};
export default async function (context) {

    await getView(context.params.id);
}
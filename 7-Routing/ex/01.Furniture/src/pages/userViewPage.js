import catalogTemplate from "../templates/userViewTemplate.js";
import furnitureService from "../services/furnitureService.js";
import authService from "../services/authService.js";


const requestFurnitures = async (id) => {
    return await furnitureService.getAllFurnitureCreator(id);
};


const getView = async () => {
    try {
        let data = await requestFurnitures(authService.getUserId());
        catalogTemplate.render(catalogTemplate.renderUserFurniture(Object.values(data)), document.querySelector('#root'));
    } catch (err) {
        alert(err);
    }

};

export default async function (context) {
    await getView();
}
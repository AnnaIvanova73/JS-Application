import catalogTemplate from "../templates/userViewTemplate.js";
import furnitureService from "../services/furnitureService.js";
import authService from "../services/authService.js";
import nav from "../pages/nav.js";


const requestFurnitures = async (id) => await furnitureService.getAllFurnitureCreator(id);

const getView = async () => {
    try {
        let data = await requestFurnitures(authService.getUserId());
        catalogTemplate.render(catalogTemplate.renderUserFurniture(Object.values(data)), document.querySelector('#root'));
    } catch (err) {
        alert(err);
    }

};

export default async function (context) {
    nav.addActiveClass('profileLink');
    await getView();
}
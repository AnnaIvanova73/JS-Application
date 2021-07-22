import furnitureService from "../services/furnitureService.js";

export default async function (context) {
    await furnitureService.deleteFurniture(context.params.id);
    context.page.redirect('/home');
}
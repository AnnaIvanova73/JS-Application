import httpRequest from "../httpLibrary/httpService.js";
import magic from "../constants/constants.js";


const getAllFurnitures = async () => {
    return await httpRequest.get(`${magic.BASE_URL}${magic.endPoints.allRecords}`, false);
};
const getFurniture = async (id) => {
    return await httpRequest.get(`${magic.BASE_URL}${magic.endPoints.getPoint}${id}`, false);
};
const getAllFurnitureCreator = async (userId) => {
    //console.log(`${magic.BASE_URL}${magic.endPoints.allRecordsOneUser}"${id}"%22`)
    return await httpRequest.get(`http://localhost:3030/data/catalog?where=_ownerId%3D%22${userId}%22`, false);
};
const createFurniture = async (data) => {
    return await httpRequest.post(`${magic.BASE_URL}${magic.endPoints.allMoviesPoint}`, true, data);
};
const updateFurniture = async (movieId,data) => {
    return await httpRequest.put(`${magic.BASE_URL}${magic.endPoints.allMoviesPoint}/${movieId}`, true, data);
};
const deleteFurniture = async (furnitureId) => {
    return await httpRequest.del(`${magic.BASE_URL}${magic.endPoints.deletePoint}${furnitureId}`, true);
};

export default {
    getAllFurnitures,getFurniture,createFurniture,updateFurniture,deleteFurniture,getAllFurnitureCreator
}
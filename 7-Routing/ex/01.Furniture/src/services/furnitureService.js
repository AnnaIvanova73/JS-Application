import httpRequest from "../httpLibrary/httpService.js";
import magic from "../constants/constants.js";
import {isYearInvalid,isBelowNumber} from "../utils/verifications.js";

const getAllFurnitures = async () => {
    return await httpRequest.get(`${magic.BASE_URL}${magic.endPoints.allRecords}`, false);
};
const getFurniture = async (id) => {
    return await httpRequest.get(`${magic.BASE_URL}${magic.endPoints.getPoint}${id}`, false);
};
const getAllFurnitureCreator = async (userId) => {
    return await httpRequest.get(`http://localhost:3030/data/catalog?where=_ownerId%3D%22${userId}%22`, false);
};
const createFurniture = async (data) => {
    return await httpRequest.post(`${magic.BASE_URL}${magic.endPoints.createPoint}`, true, data);
};
const updateFurniture = async (fId, data) => {
    console.log(`${magic.BASE_URL}${magic.endPoints.updatePoint}${fId}`);
    return await httpRequest.put(`${magic.BASE_URL}${magic.endPoints.updatePoint}${fId}`, true, data);
};
const deleteFurniture = async (furnitureId) => {
    return await httpRequest.del(`${magic.BASE_URL}${magic.endPoints.deletePoint}${furnitureId}`, true);
};
const isValidYearFieldControl = (e) => {
    if (isYearInvalid(e.target.value)) {
        e.target.classList.remove('is-valid');
        e.target.classList.add('is-invalid');
    } else {
        e.target.classList.remove('is-invalid');
        e.target.classList.add('is-valid');
    }
};
const isValidModelFieldControl = (e) => {
    if (isBelowNumber(e.target.value, 4)) {
        e.target.classList.remove('is-valid');
        e.target.classList.add('is-invalid');
    } else {
        e.target.classList.remove('is-invalid');
        e.target.classList.add('is-valid');
    }
};
export default {
    getAllFurnitures,
    getFurniture,
    createFurniture,
    updateFurniture,
    deleteFurniture,
    getAllFurnitureCreator,
    isValidYearFieldControl,
    isValidModelFieldControl
};
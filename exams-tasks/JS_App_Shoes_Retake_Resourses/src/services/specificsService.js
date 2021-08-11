import httpRequester from "../httpLibrary/httpRequester.js";
import magic from "../constants/constants.js";

const getProductTotalBuyers = async (recordId) => await httpRequester
    .get(`${magic.BASE_URL}/data/buyers?where=productId%3D%22${recordId}%22&distinct=_ownerId&count}`, false);



const buyRecord = async (data) => {
    return await httpRequester.post(`${magic.BASE_URL}${magic.endPoints.buyersPoint}`, true, data);
};

const getUserBoughtProduct = async (userId,recordId) => await httpRequester
    .get(`${magic.BASE_URL}/data/buyers?where=productId%3D%22${recordId}%22%20and%20_ownerId%3D%22${userId}%22`, false);

const addBuyer = async (idRecord, data) => await httpRequester
    .put(`${magic.BASE_URL}${magic.endPoints.addBuyerPoint}${idRecord}`, true, data);

const test = async (idRecord, data) => await httpRequester
    .put(`${magic.BASE_URL}${magic.endPoints.addBuyerPoint}${idRecord}`, true, data);

export default {
    getProductTotalBuyers,buyRecord,getUserBoughtProduct,addBuyer
};
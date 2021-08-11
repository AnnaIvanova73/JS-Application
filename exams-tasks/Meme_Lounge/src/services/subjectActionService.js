import authService from './authService.js'
import httpRequester from "../httpLibrary/httpRequester.js";
import magic from "../constants/constants.js";

const getAllRecords = async () => {
    return await httpRequester.get(`${magic.BASE_URL}${magic.endPoints.allRecordsPoint}`, false);
};
const getRecord = async (idRecord) => {
    return await httpRequester.get(`${magic.BASE_URL}${magic.endPoints.detailsRecordPoint}${idRecord}`, false);
};
const getAllRecordsUser = async () => {
    return await httpRequester.get(`${magic.BASE_URL}/data/memes?where=_ownerId%3D%22${authService.getUserId()}%22&sortBy=_createdOn%20desc`, false);
};
const createRecord = async (data) => {
    return await httpRequester.post(`${magic.BASE_URL}${magic.endPoints.createPoint}`, true, data);
};
const updateRecord = async (idRecord, data) => {
    return await httpRequester.put(`${magic.BASE_URL}${magic.endPoints.updatePoint}${idRecord}`, true, data);
};
const deleteRecord = async (idRecord) => {
    return await httpRequester.del(`${magic.BASE_URL}${magic.endPoints.deletePoint}${idRecord}`, true);
};

export default {
    getAllRecords,
    getRecord,
    getAllRecordsUser,
    createRecord,
    updateRecord,
    deleteRecord
};
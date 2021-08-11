import authService from './authService.js'
import httpRequester from "../httpLibrary/httpRequester.js";
import magic from "../constants/constants.js";

const getAllRecords = async () => {
    return await httpRequester.get(`${magic.BASE_URL}${magic.endPoints.allRecordsPoint}`, false);
};
const getRecord = async (idRecord) => {
    return await httpRequester.get(`${magic.BASE_URL}${magic.endPoints.singleRecordPoint}${idRecord}`, false);
};
const getAllRecordsWithUser = async () => {
    return await httpRequester.get(`${magic.BASE_URL}/data/members?where=_ownerId%3D%22${authService.getUserId()}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`, false);
};
const getAllRecordsForUser = async () => {
    return await httpRequester.get(`${magic.BASE_URL}/data/cars?where=_ownerId%3D%22${authService.getUserId()}%22`, false);
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


const getListOfAllMembers = async (idRecord) => {
    return await httpRequester.get(`${magic.BASE_URL}/data/members?where=teamId%3D%22${idRecord}%22&load=user%3D_ownerId%3Ausers`, false);
};
export default {
    getAllRecords,
    getRecord,
    getAllRecordsForUser,
    getAllRecordsWithUser,
    createRecord,
    updateRecord,
    deleteRecord,
    getListOfAllMembers
};
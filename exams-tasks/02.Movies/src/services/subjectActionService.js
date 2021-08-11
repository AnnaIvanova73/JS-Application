import authService from './authService.js';
import httpRequester from "../httpLibrary/httpRequester.js";
import magic from "../constants/constants.js";

const getAllRecords = async () => await httpRequester.get(`${magic.BASE_URL}${magic.endPoints.allRecordsPoint}`, false);

const getRecord = async (idRecord) => await httpRequester.get(`${magic.BASE_URL}${magic.endPoints.detailsRecordPoint}${idRecord}`, false);

const getAllRecordsUser = async () => await httpRequester.get(`${magic.BASE_URL}/data/cars?where=_ownerId%3D%22${authService.getUserId()}%22&sortBy=_createdOn%20desc`, false);

const createRecord = async (data) => await httpRequester.post(`${magic.BASE_URL}${magic.endPoints.createPoint}`, true, data);

const updateRecord = async (idRecord, data) => await httpRequester.put(`${magic.BASE_URL}${magic.endPoints.updatePoint}${idRecord}`, true, data);

const deleteRecord = async (idRecord) => await httpRequester.del(`${magic.BASE_URL}${magic.endPoints.deletePoint}${idRecord}`, true);

const getAllByParam = async (param) => await httpRequester.get(`${magic.BASE_URL}/data/cars?where=year%3D${param}`, false);

export default {
    getAllRecords,
    getRecord,
    getAllRecordsUser,
    createRecord,
    updateRecord,
    deleteRecord,
    getAllByParam
};
import httpRequester from "../httpLibrary/httpRequester.js";
import magic from "../constants/constants.js";

const getAllRecords = async () => await httpRequester.get(`${magic.BASE_URL}${magic.endPoints.allRecordsPoint}`, false);

const getRecord = async (idRecord) => await httpRequester.get(`${magic.BASE_URL}${magic.endPoints.detailsPoint}${idRecord}`, false);

const getAllRecordsUser = async (idUser) => await httpRequester.get(`${magic.BASE_URL}${magic.endPoints.searchPoint}?where=_ownerId%3D%22${idUser}%22&sortBy=_createdOn%20desc`, false);

const createRecord = async (data) => await httpRequester.post(`${magic.BASE_URL}${magic.endPoints.createPoint}`, true, data);

const updateRecord = async (idRecord, data) => await httpRequester.put(`${magic.BASE_URL}${magic.endPoints.updatePoint}${idRecord}`, true, data);

const partialUpdateRecord = async (idRecord, data) => await httpRequester.patch(`${magic.BASE_URL}${magic.endPoints.updatePoint}${idRecord}`, true, data);

const deleteRecord = async (idRecord) => await httpRequester.del(`${magic.BASE_URL}${magic.endPoints.deletePoint}${idRecord}`, true);

const getAllByParamSorted = async (searchBy,param,sortedBy) =>
    await httpRequester.get(`${magic.BASE_URL}${magic.endPoints.searchPoint}?where=${searchBy}%3D%22${param}%22&sortBy=${sortedBy}%20desc`, false);

const getAllByParam = async (searchBy,param) =>
    await httpRequester.get(`${magic.BASE_URL}${magic.endPoints.searchPoint}?where=${searchBy}%3D%22${param}%22`, false);

export default {
    getAllRecords,
    getRecord,
    getAllRecordsUser,
    createRecord,
    updateRecord,
    deleteRecord,
    getAllByParam,
    partialUpdateRecord,
    getAllByParamSorted
};
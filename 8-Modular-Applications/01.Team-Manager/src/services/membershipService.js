import httpRequester from "../httpLibrary/httpRequester.js";
import magic from "../constants/constants.js";

const requestMembership = async (data) => {
    return await httpRequester.post(`${magic.BASE_URL}${magic.endPoints.requestMembership}`, true, data);
};
const approveMembership = async (idRecord, data) => {
    return await httpRequester.put(`${magic.BASE_URL}${magic.endPoints.approveMembership}${idRecord}`, true, data);
};
const removeMembersRequest = async (idRecord) => {
    return await httpRequester.del(`${magic.BASE_URL}${magic.endPoints.removeMembersRequest}${idRecord}`, true);
};


export default {
    requestMembership,approveMembership,removeMembersRequest
}
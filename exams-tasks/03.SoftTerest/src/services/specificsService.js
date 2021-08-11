import httpRequester from "../httpLibrary/httpRequester.js";
import magic from "../constants/constants.js";

const getUserLikesPerRecord = async (userId,recordId) => await httpRequester.get(`${magic.BASE_URL}/data/likes?where=recordId%3D%22${recordId}%22%20and%20_ownerId%3D%22${userId}%22`, false);

const getTotalLikes = async (recordId) => await httpRequester.get(`${magic.BASE_URL}/data/likes?where=recordId%3D%22${recordId}%22&count}`, false);

const getTotalComments = async (recordId) => await httpRequester.get(`${magic.BASE_URL}/data/comments?where=recordId%3D%22${recordId}%22&count}`, false);

const likeRecord = async (data) => {
    return await httpRequester.post(`${magic.BASE_URL}${magic.endPoints.likesPoint}`, true, data);
};
const commentOnRecord = async (data) => {
    return await httpRequester.post(`${magic.BASE_URL}${magic.endPoints.commentsPoint}`, true, data);
};

const searchCaseSensitive = async (paramSearch,searchedText) => {
    return await httpRequester.get(`${magic.BASE_URL}${magic.endPoints.createPoint}?where=${paramSearch}%3D%22${searchedText}%22`, true);
};
const searchCaseInsensitive = async (paramSearch,searchedText) => {
    return await httpRequester.get(`${magic.BASE_URL}${magic.endPoints.createPoint}?where=${paramSearch}%20LIKE%20%22${searchedText}%22`, true);
};
export default {
    getUserLikesPerRecord, getTotalLikes,getTotalComments,likeRecord,commentOnRecord, searchCaseInsensitive,searchCaseSensitive
};
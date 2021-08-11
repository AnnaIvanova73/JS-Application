import httpRequester from "../httpLibrary/httpRequester.js";
import magic from "../constants/constants.js";
//to http://localhost:3030/data/likes?where=bookId%3D%221001%22%20and%20_ownerId%3D%22null%22&count
const getUserLikesPerRecord = async (userId,recordId) =>
    await httpRequester.get(`${magic.BASE_URL}/data/likes?where=bookId%3D%22${recordId}%22%20and%20_ownerId%3D%22${userId}%22&count`, false);

///data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count
const getTotalLikes = async (recordId) =>
    await httpRequester.get(`${magic.BASE_URL}/data/likes?where=bookId%3D%22${recordId}%22&distinct=_ownerId&count`, false);

const likeRecord = async (data) => {
    return await httpRequester.post(`${magic.BASE_URL}${magic.endPoints.likesPoint}`, true, data);
};

export default {
    getUserLikesPerRecord, getTotalLikes,likeRecord
};
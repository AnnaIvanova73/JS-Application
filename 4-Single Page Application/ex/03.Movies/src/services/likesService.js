import httpRequest from "../httpLibrary/httpService.js";
import magic from "../constants/constants.js";

const getAllLikes = async () => {
    return await httpRequest.get(`${magic.BASE_URL}${magic.endPoints.addLike}`, false);
};
const addLike = async (data) => {
    return await httpRequest.post(`${magic.BASE_URL}${magic.endPoints.addLike}`, true, data);
};

const getLike = async (movieId, userId) => {
    return await httpRequest.get(`${magic.BASE_URL}data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`
        , true);
};

export default {
    getAllLikes,
    addLike,
    getLike
}
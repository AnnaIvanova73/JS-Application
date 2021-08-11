import constants from "../constants/constants.js";
import httpRequester from "../httpLibrary/httpRequester.js";

const getUsername = () => localStorage.getItem(constants.NAME_USER);

const setUserName = (username) => localStorage.setItem(constants.NAME_USER, username);

const getEmail = () => localStorage.getItem(constants.EMAIL_USER);

const setEmail = (email) => localStorage.setItem(constants.EMAIL_USER, email);

const getUserId = () => localStorage.getItem(constants.ID_USER);

const setUserId = (idUser) => localStorage.setItem(constants.ID_USER, idUser);

const getToken = () => localStorage.getItem(constants.AUTH_TOKEN);

const setToken = (token) => localStorage.setItem(constants.AUTH_TOKEN, token);

const removeUserInfo = () => {
    localStorage.removeItem(constants.AUTH_TOKEN);
    localStorage.removeItem(constants.ID_USER);
    localStorage.removeItem(constants.EMAIL_USER);
    localStorage.removeItem(constants.NAME_USER);
};

const isLoggedIn = () => {
    return getToken() !== undefined && getToken() !== null;
};

const logUser = async (data) => {
    let responseJson = await httpRequester.post(`${constants.BASE_URL}${constants.endPoints.login}`, false, data);
    setToken(responseJson.accessToken);
    setUserId(responseJson._id);
    setEmail(responseJson.email);
    setUserName(responseJson.username);

};
const regUser = async (data) => {
    let responseJson = await httpRequester.post(`${constants.BASE_URL}${constants.endPoints.register}`, false, data);
    setToken(responseJson.accessToken);
    setUserId(responseJson._id);
    setEmail(responseJson.email);
    setUserName(responseJson.username);
};

const logout = async () => {
    await httpRequester.get(`${constants.BASE_URL}${constants.endPoints.logout}`, true);
    removeUserInfo();
};

export default {
    isLoggedIn, getToken, getEmail, getUserId, logUser, regUser, logout, removeToken:removeUserInfo,getUsername
};
import constants from "../constants/constants.js";
import httpRequester from "../httpLibrary/httpRequester.js";

const getUserName = () => {
    return localStorage.getItem(constants.NAME_USER);
};
const setUserName = (email) => {
    localStorage.setItem(constants.NAME_USER, email)
};

const getEmail = () => {
    return localStorage.getItem(constants.EMAIL_USER);
};
const setEmail = (email) => {
    localStorage.setItem(constants.EMAIL_USER, email)
};
const getUserId = () => {
    return localStorage.getItem(constants.ID_USER);
};
const setUserId = (email) => {
    localStorage.setItem(constants.ID_USER, email)
};
const getToken = () => {
    return localStorage.getItem(constants.AUTH_TOKEN);
};

const setToken = (token) => {
    localStorage.setItem(constants.AUTH_TOKEN, token)
};
const removeToken = () => {
    localStorage.clear();
};

const isLoggedIn = () => {
    return getToken() !== undefined && getToken() !== null;
};

const logUser = async (data) => {
    let responseJson = await httpRequester.post(`${constants.BASE_URL}${constants.endPoints.login}`, false, data);
    setEmail(responseJson.email);
    setUserId(responseJson._id);
    setToken(responseJson.accessToken);
    setUserName(responseJson.username);
};
const regUser = async (data) => {
    let responseJson = await httpRequester.post(`${constants.BASE_URL}${constants.endPoints.register}`, false, data);
    setEmail(responseJson.email);
    setUserId(responseJson._id);
    setToken(responseJson.accessToken);
    console.log(responseJson)
    setUserName(responseJson.username);
};

const logout = async () => {
    await httpRequester.get(`${constants.BASE_URL}${constants.endPoints.logout}`, true);
    localStorage.clear();

};

export default {
    isLoggedIn, getToken, getEmail, getUserId, logUser,regUser,logout,removeToken,getUserName
};
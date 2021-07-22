import constants from "../constants/constants.js";
import httpRequest from "../httpLibrary/httpService.js";
import nav from "../pages/nav.js";


const getEmail = () => {
    return localStorage.getItem(constants.EMAIL_USER);
};
const setEmail = (email) => {
    localStorage.setItem(constants.EMAIL_USER, email);
};
const getUserId = () => {
    return localStorage.getItem(constants.ID_USER);
};
const setUserId = (email) => {
    localStorage.setItem(constants.ID_USER, email);
};
const getToken = () => {
    return localStorage.getItem(constants.AUTH_TOKEN);
};

const setToken = (token) => {
    localStorage.setItem(constants.AUTH_TOKEN, token);
};
const removeToken = () => {
    localStorage.clear();
};

const isLoggedIn = () => {
    return getToken() !== undefined && getToken() !== null;
};

const logUser = async (data,context) => {
    let responseJson = await httpRequest.post(`${constants.BASE_URL}${constants.endPoints.login}`, false, data);
    setEmail(responseJson.email);
    setUserId(responseJson._id);
    setToken(responseJson.accessToken);
    await nav.loginUserView();
    context.page.redirect('/home');
};
const regUser = async (data,context) => {
    let responseJson = await httpRequest.post(`${constants.BASE_URL}${constants.endPoints.register}`, false, data);
    setEmail(responseJson.email);
    setUserId(responseJson._id);
    setToken(responseJson.accessToken);
    await nav.loginUserView();
    context.page.redirect('/home');
};

const logout = async (context) => {
    await httpRequest.get(`${constants.BASE_URL}${constants.endPoints.logout}`, true);
    localStorage.clear();
    await nav.logoutUserView();
    context.page.redirect('/home');
};
let authService = {
    isLoggedIn, getToken, getEmail, getUserId, logUser, regUser, logout, removeToken
};
export default authService;
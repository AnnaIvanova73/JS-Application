import constants from './constants.js';

const isAuthenticated = () => {
    return Boolean(localStorage.getItem(constants.authToken));
};
const getToken = () => {
    return localStorage.getItem(constants.authToken);
};
const setToken = (token) => {
    localStorage.setItem(constants.authToken, token);
};

const getUserEmail = () => {
    return localStorage.getItem(`userEmail`);
};
const setUserEmail = (email) => {
    localStorage.setItem('userEmail', email);
};
const getUserId = (id) => {
    return localStorage.getItem('id');
};
const setUserId = (id) => {
    localStorage.setItem('id', id);
};

export default {
    isAuthenticated, getUserEmail, setToken, setUserEmail, setUserId, getToken,getUserId

};
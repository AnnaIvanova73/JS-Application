const BASE_URL = `http://localhost:3030`;

const AUTH_TOKEN = `auth_token`;
const EMAIL_USER = `email_user`;
const ID_USER = `id_user`;
const NAME_USER = `name_user`;


const FIELDS_ALERT = `All field\'s are required!`;
const PASSWORD_ALERT = `Those passwords didn't match. Try again.`;
const VALUE_SHOULD_BE_POSITIVE = `Year/price should be a positive number!`;

let endPoints = {
    login: `/users/login`,
    register: `/users/register`,
    logout: `/users/logout`,
    likesPoint: `/data/likes`,
    allRecordsPoint: `/data/books?sortBy=_createdOn%20desc`,
    createPoint: `/data/books`,
    searchPoint: `/data/books`,
    updatePoint: `/data/books/`,
    detailsPoint: `/data/books/`,
    deletePoint: `/data/books/`,
};
export default {
    AUTH_TOKEN, EMAIL_USER, BASE_URL, endPoints, FIELDS_ALERT, PASSWORD_ALERT, ID_USER, NAME_USER,VALUE_SHOULD_BE_POSITIVE
};
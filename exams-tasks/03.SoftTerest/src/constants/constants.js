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
    commentsPoint: `/data/comments`,
    allRecordsPoint: `/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc`,
    createPoint: `/data/ideas`,
    searchPoint: `/data/ideas`,
    updatePoint: `/data/ideas/`,
    detailsPoint: `/data/ideas/`,
    deletePoint: `/data/ideas/`,
};
export default {
    AUTH_TOKEN, EMAIL_USER, BASE_URL, endPoints, FIELDS_ALERT, PASSWORD_ALERT, ID_USER, NAME_USER,VALUE_SHOULD_BE_POSITIVE
};
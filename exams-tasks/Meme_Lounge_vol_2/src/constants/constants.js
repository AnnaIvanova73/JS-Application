const BASE_URL = `http://localhost:3030`;

const AUTH_TOKEN = `auth_token`;
const EMAIL_USER = `email_user`;
const ID_USER = `id_user`;
const NAME_USER = `name_user`;


const FIELDS_ALERT = `All field\'s are required!`;
const PASSWORD_ALERT = `Those passwords didn't match. Try again.`;

let endPoints = {
    login: `/users/login`,
    register: `/users/register`,
    logout: `/users/logout`,
    allRecordsPoint: `/data/memes?sortBy=_createdOn%20desc`,
    createPoint: `/data/memes`,
    searchPoint: `/data/memes`,
    updatePoint: `/data/memes/`,
    detailsPoint: `/data/memes/`,
    deletePoint: `/data/memes/`,
};
export default {
    AUTH_TOKEN, EMAIL_USER, BASE_URL, endPoints, FIELDS_ALERT, PASSWORD_ALERT, ID_USER, NAME_USER
};
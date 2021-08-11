const BASE_URL = `http://localhost:3030`;

const AUTH_TOKEN = `auth_token`;
const EMAIL_USER = `email_user`;
const ID_USER = `id_user`;
const NAME_USER = `name_user`;


const FIELDS_ALERT = `All field\'s are required!`;
const PASSWORD_ALERT = `Those passwords didn't match. Try again.`;
const VALUE_SHOULD_BE_POSITIVE = `Year/price should be a positive number!`;
const CATEGORY_SHOULD_BE_CORRECT = `Please enter correct category`;

let endPoints = {
    login: `/users/login`,
    register: `/users/register`,
    logout: `/users/logout`,
    allRecordsUserPoint: `/data/articles?sortBy=_createdOn%20desc`,
    allRecordsPoint: `/data/articles`,
    createPoint: `/data/articles`,
    searchPoint: `/data/articles`,
    updatePoint: `/data/articles/`,
    detailsPoint: `/data/articles/`,
    deletePoint: `/data/articles/`,
};
let serverCategories = {
    java: `Java`,
    js: `JavaScript`,
    csharp: `CSharp`,
    python: `Python`,
};
export default {
    AUTH_TOKEN, EMAIL_USER, BASE_URL, endPoints, FIELDS_ALERT, PASSWORD_ALERT, ID_USER, NAME_USER,VALUE_SHOULD_BE_POSITIVE,CATEGORY_SHOULD_BE_CORRECT,serverCategories
};
const BASE_URL = `http://localhost:3030`;

const AUTH_TOKEN = `auth_token`;
const EMAIL_USER = `email_user`;
const ID_USER = `user_id`;
const NAME_USER = `name_id`;

const FIELDS_ALERT = `All field\'s are required!`;
const PASSWORD_ALERT = `Those passwords didn't match. Try again.`;
const VALUE_SHOULD_BE_POSITIVE = `Year/price should be a positive number!`;
const PASS_LIMIT = `Password should be at least 6 characters!`;

const searchParam = 'title';

let endPoints ={
    login: `/users/login`,
    register: `/users/register`,
    logout: `/users/logout`,
    allRecordsPoint: `/data/shoes`,
    createPoint: `/data/shoes`,
    updatePoint: `/data/shoes/`,
    deletePoint: `/data/shoes/`,
    detailsRecordPoint: `/data/shoes/`,
    buyersPoint: `/data/buyers`,
    addBuyerPoint: `/data/shoes`,
};
export default {
    AUTH_TOKEN,
    EMAIL_USER,
    BASE_URL,
    endPoints,
    FIELDS_ALERT,
    PASSWORD_ALERT,
    ID_USER,
    NAME_USER,
    VALUE_SHOULD_BE_POSITIVE,
    searchParam,
    PASS_LIMIT
}
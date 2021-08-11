const BASE_URL = `http://localhost:3030`;

const AUTH_TOKEN = `auth_token`;
const EMAIL_USER = `email_user`;
const ID_USER = `user_id`;
const NAME_USER = `name_id`;

const FIELDS_ALERT = `All field\'s are required!`;
const PASSWORD_ALERT = `Those passwords didn't match. Try again.`;
const VALUE_SHOULD_BE_POSITIVE = `Year/price should be a positive number!`;

let endPoints ={
    login: `/users/login`,
    register: `/users/register`,
    logout: `/users/logout`,
    allRecordsPoint: `/data/cars?sortBy=_createdOn%20desc`,
    createPoint: `/data/cars`,
    updatePoint: `/data/cars/`,
    detailsRecordPoint: `/data/cars/`,
    deletePoint: `/data/cars/`,
};
export default {
    AUTH_TOKEN,EMAIL_USER,BASE_URL,endPoints,FIELDS_ALERT,PASSWORD_ALERT,ID_USER,NAME_USER,VALUE_SHOULD_BE_POSITIVE
}
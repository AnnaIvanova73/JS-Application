const AUTH_TOKEN = `auth_token`;
const EMAIL_USER = `email_user`;
const ID_USER = `user_id`;
const BASE_URL = `http://localhost:3030/`;

const FIELDS_ALERT = `All field\'s are required!`;
const PASSWORD_ALERT = `Those passwords didn't match. Try again.`;
const INVALID_MODEL = `Model should be at least 4 characters long`;
const INVALID_MAKE = `Furniture type should be at least 4 characters long`;
const INVALID_YEAR = `Year should be between 1950 and 2050`;
const INVALID_DESCRIPTION = `The description should be at least 11 characters long.`;
const INVALID_PRICE = `Price should be positive number.`;
const INVALID_URL = `Image URL is required!`;
const FIELDS_FURNITURE = `All field\'s except material are required!`;


let endPoints = {
    allRecords: `data/catalog`,
    createPoint: `data/catalog`,
    getPoint: `data/catalog/`,
    updatePoint: `data/catalog/`,
    deletePoint: `data/catalog/`,
    login: `users/login`,
    register: `users/register`,
    logout: `users/logout`
};
export default {
    AUTH_TOKEN,
    EMAIL_USER,
    BASE_URL,
    endPoints,
    FIELDS_ALERT,
    PASSWORD_ALERT,
    ID_USER,
    INVALID_DESCRIPTION,
    INVALID_MODEL,
    INVALID_YEAR,
    INVALID_PRICE,
    INVALID_URL,
    INVALID_MAKE,
    FIELDS_FURNITURE
};
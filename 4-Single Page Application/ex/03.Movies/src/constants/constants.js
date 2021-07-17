const AUTH_TOKEN = `auth_token`;
const EMAIL_USER = `email_user`;
const ID_USER = `user_id`;
const BASE_URL = `http://localhost:3030/`;
const FIELDS_ALERT = `All field\'s are required!`
const PASSWORD_ALERT = `Those passwords didn't match. Try again.`
let endPoints ={
    allMoviesPoint: `data/movies`,
    createPoint: `data/movies`,
    updatePoint: `data/movies/`,
    deletePoint: `data/movies/`,
    addLike: `data/likes`,
    allLikes: `data/likes`,
    revokeLike:`/data/likes/`,
    login: `users/login`,
    register: `users/register`,
    logout: `users/logout`
}
export default {
    AUTH_TOKEN,EMAIL_USER,BASE_URL,endPoints,FIELDS_ALERT,PASSWORD_ALERT,ID_USER
}
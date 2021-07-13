const AUTH_TOKEN = 'auth-token';
const ROOT_URL = 'http://localhost:3030/';
const REGISTER_URL = `http://localhost:3030/users/register`
const LOGIN_URL = `http://localhost:3030/users/login`

const getNavItems = () => {
    let navItems = document.querySelectorAll('.nav-item');
    return {
        welcome: navItems[0],
        logout: navItems[1],
        login: navItems[2],
        register: navItems[3],
        navBar: document.querySelector('.navbar'),
    };
};
const getViews = () => {
    return {
        homePage: [document.querySelector('#home-page'),
            document.querySelector('#add-movie-button'),
            document.querySelector('.text-center'),
            document.querySelector('#movie')],
        addMovie: document.querySelector('#add-movie'),
        movieDetails: document.querySelector('#movie-example'),
        editMovie: document.querySelector('#edit-movie'),
        loginForm: document.querySelector('#form-login'),
        registerForm: document.querySelector('#form-sign-up'),
    };
};


export default {
    authToken: AUTH_TOKEN, getNavItems, getViews,ROOT_URL, REGISTER_URL,LOGIN_URL
}
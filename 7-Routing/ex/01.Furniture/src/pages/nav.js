import authService from "../services/authService.js";


let keepRefElement = undefined;

const init = (domElement) => {
    keepRefElement = domElement;
    if (authService.isLoggedIn()) {
        loginUserView();
    } else {
        logoutUserView();
    }
};


const loginUserView = () => {
    let usersNav = keepRefElement.querySelector('#user');
    let guestsNav = keepRefElement.querySelector('#guest');
    usersNav.classList.remove('hidden');
    guestsNav.classList.add('hidden');
};
const logoutUserView = () => {
    let usersNav = keepRefElement.querySelector('#user');
    let guestsNav = keepRefElement.querySelector('#guest');
    usersNav.classList.add('hidden');
    guestsNav.classList.remove('hidden');
};
const addActiveClass = (selector) => {
    let nav = document.querySelectorAll('#navigation a');
     Array.from(nav).forEach(e => e.classList.remove('active'));
     document.getElementById(selector).classList.add('active')

};
let navigation = {
    init, loginUserView, logoutUserView,addActiveClass
};

export default navigation;


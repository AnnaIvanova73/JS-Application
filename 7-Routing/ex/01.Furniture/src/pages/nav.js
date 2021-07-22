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

let navigation = {
    init, loginUserView, logoutUserView
};

export default navigation;
import constants from '../constants/constants.js';
import auth from '../utils/auth.js';

const updateNavbar = () => {
    constants.getNavItems().welcome.removeAttribute('hidden');

    if (!auth.isAuthenticated()) {
        constants.getNavItems().welcome.querySelector(`.nav-link`).textContent = `Welcome, guest! :)`;
        constants.getNavItems().logout.setAttribute('hidden', '');
        constants.getNavItems().register.removeAttribute('hidden', '');
        constants.getNavItems().login.removeAttribute('hidden', '');
    } else {
        constants.getNavItems().welcome.querySelector(`.nav-link`).textContent = `Welcome, ${auth.getUserEmail()}! :)`;
        constants.getNavItems().logout.removeAttribute('hidden');
        constants.getNavItems().register.setAttribute('hidden', '');
        constants.getNavItems().login.setAttribute('hidden', '');
    }

};

export default {
    updateNavbar
}
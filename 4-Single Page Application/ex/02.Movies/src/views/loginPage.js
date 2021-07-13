import navigation from './navigation.js';
import constants from '../constants/constants.js';
import auth from '../utils/auth.js';
import utils from '../utils/utils.js';

const getDataFromForm = (form) => {
    if (utils.isInvalid([form.get('email'),form.get('password')])) {
        throw new Error('All fields are required!')
    }

    return{
        email: form.get('email'),
        password: form.get('password'),
    };
};
const callLoginView = () => {
    const login = constants.getViews().loginForm;
    utils.goHome()
    utils.hideAllViewsExceptOne('loginForm');
    login.removeAttribute('hidden');
    constants.getNavItems().welcome.setAttribute('hidden', '');

    let formElement = login.querySelector('form');
    formElement.addEventListener('submit', async (e) => {
        e.preventDefault();
        let form = e.currentTarget;
        let currFormData = new FormData(form);
        try {
            let objectData = getDataFromForm(currFormData);
            const response = await fetch(`${constants.LOGIN_URL}`, utils.requestHttpCredentials('POST',objectData));

            if(response.ok){

                let jsonResponse = await response.json();
                auth.setToken(jsonResponse.accessToken);
                auth.setUserEmail(currFormData.get('email'));
                auth.setUserId(jsonResponse._id);

                navigation.updateNavbar();
                utils.hideAllViewsExceptOne('homePage');
            }
        } catch (err) {
            console.log(err);
        }finally{
            form.reset();
        }
    });
}


export default {
    callLoginView
}
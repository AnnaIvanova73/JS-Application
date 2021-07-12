import navigation from './navigation.js';
import constants from './constants.js';
import auth from './auth.js';
import utils from './utils.js';

const getDataFromForm = (form) => {
    if (utils.isInvalid([form.get('email'), form.get('repeatPassword'),form.get('password')])) {
        throw new Error('All fields are required!')
    }
    if (form.get('repeatPassword') !== form.get('password')) {
        throw new Error('Passwords do not match');
    }
    return{
        email: form.get('email'),
        password: form.get('password'),
    }
}
const callRegisterView = () => {
    const register = constants.getViews().registerForm;
    utils.goHome()
    utils.hideAllViewsExceptOne('registerForm');
    register.removeAttribute('hidden');
    constants.getNavItems().welcome.setAttribute('hidden', '');

    let formElement = register.querySelector('form');
    formElement.addEventListener('submit', async (e) => {
        e.preventDefault();
        let form = e.currentTarget;
        let currFormData = new FormData(form);
        try {
            let objectData = getDataFromForm(currFormData);
            const response = await fetch(`${constants.REGISTER_URL}`, utils.requestHttpCredentials('POST',objectData));

            if(response.ok){
                let jsonResponse = await response.json();
                console.log(jsonResponse);
                auth.setToken(jsonResponse.accessToken);
                console.log(localStorage)
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
    callRegisterView
}
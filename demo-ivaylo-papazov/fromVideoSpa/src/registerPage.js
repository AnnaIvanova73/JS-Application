import moviesPage from './moviesPage.js';
import {saveToken} from './auth.js'
import navigation from "./navigation.js";

let baseUrl = `http://localhost:3030`;
let registerSection = document.querySelector('section.register');
let registerForm = registerSection.querySelector('#register-form');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = new FormData(e.currentTarget);

    fetch(`${baseUrl}/users/register`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        }, body: JSON.stringify({
            email: data.get('email'), password: data.get('password')
        })

    }).then((res) => res.json())
        .then((responseData) => {
            saveToken(responseData.accessToken);
            hidePage();
            moviesPage.showPage();
            navigation.updateNavigation();
        });
});


function showPage() {
    console.log('register');
    registerSection.classList.remove('hidden');
}

function hidePage() {
    registerSection.classList.add('hidden');
}

export default {
    showPage, hidePage
}
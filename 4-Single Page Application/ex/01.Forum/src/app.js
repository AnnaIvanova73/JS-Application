import renderOnDom from './renderOnDom.js';
import {isInvalid, methodPostPut} from './constants.js';
import {returnHome, showPage} from './commentPage.js';

fetch(`http://localhost:3030/jsonstore/collections/myboard/posts`)
    .then(response => response.json())
    .then(data => {
        Object.values(data).forEach(e => {
            document.querySelector(`.topic-title`).appendChild(renderOnDom.homeView(e));
        });
    });

const getDataFromForm = (form) => {
    if (isInvalid([form.get('topicName'), form.get('username'), form.get('postText')])) {
        throw new Error('All fields are required!')
    }

    return {
        topicName: form.get('topicName'),
        username: form.get('username'),
        postText: form.get('postText'),
    };
};

showPage();
returnHome();
let form = document.querySelector('form');
form.addEventListener('submit', e => {
    e.preventDefault();
    if (e.submitter.classList.contains('cancel')) {
        e.currentTarget.reset();
        return;
    }
    let currForm = e.currentTarget
    let newTarget = new FormData(currForm);


    try {
        let formObject = getDataFromForm(newTarget);
        let today = new Date();
        formObject._createdOn = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
        fetch(`http://localhost:3030/jsonstore/collections/myboard/posts`, methodPostPut('POST', formObject))
            .then(response => response.json())
            .then(data => {
                document.querySelector(`.topic-title`).appendChild(renderOnDom.homeView(data));
            });

    } catch (err) {
        alert(err.message);
    } finally {
        currForm.reset();
    }
});

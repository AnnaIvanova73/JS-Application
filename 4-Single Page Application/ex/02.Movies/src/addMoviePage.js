import Utils from './utils.js';
import constants from './constants.js';
import auth from "./auth.js";
import renderOnDom from './renderOnDom.js';

const throwIfNotAuthenticated = () => {
    if (!auth.isAuthenticated()) {
        throw new Error('You can create movie! Login or register!');
    }
};
const getDataFromForm = (form) => {
    if (Utils.isInvalid([form.get('title'), form.get('description'), form.get('imageUrl')])) {
        throw new Error('All fields are required!')
    }
    return {
        title: form.get('title'),
        description: form.get('description'),
        img: form.get('imageUrl'),
    };
};

const callAddMovieView = () => {
    Utils.goHome();
    Utils.hideAllViewsExceptOne('addMovie')
    let form = constants.getViews().addMovie.querySelector('form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        let form = e.currentTarget;
        let currFormData = new FormData(form);
        try {
            throwIfNotAuthenticated();

            let objectData = getDataFromForm(currFormData);

            let httpPost = Utils.requestHttpCredentials('POST', objectData);
            httpPost.headers = {'Content-type': 'application/json', 'X-Authorization': auth.getToken()};
            let url = `${constants.ROOT_URL}data/movies`;

            let response = await fetch(url, httpPost);
            if (response.ok) {
                let data = await response.json();
                let objDomRend = {img:data.img, title:data.title, _ownerId:data._ownerId, _id:data._id}
                let movieDiv = renderOnDom.formMoviePreview(objDomRend);
                document.querySelector(`#movie .card-deck`).appendChild(movieDiv);
            }
            Utils.hideAllViewsExceptOne('homePage');
        } catch (err) {
            alert(err);
        } finally {
            form.reset();

        }
    })
};

export default {
    callAddMovieView
};

/*
     // console.log(objectData);
            // let  response = await fetch('http://localhost:3030/data/movies',{
            //     method:'POST',
            //     headers : {'Content-type': 'application/json', 'X-Authorization': auth.getToken()},
            //     body: JSON.stringify({title:'asd',description:'asdasd',img:'asd'})
            // });
 */
import constants from '../constants/constants.js';
import Utils from '../utils/utils.js';
import auth from '../utils/auth.js';


const getDataFromForm = (form) => {
    if (Utils.isInvalid([form.get('title'), form.get('description'), form.get('imageUrl')])) {
        throw new Error('All fields are required!');
    }
    let title = form.get('title');
    console.log(title)
    return {
        title: form.get('title'),
        description: form.get('description'),
        img: form.get('imageUrl'),
    }
};
const callEditMoviePage = (domElementDivContainer, _id) => {
    Utils.goHome();
    Utils.hideAllViewsExceptOne('editMovie');

    let form = constants.getViews().editMovie.querySelector('form');

    form.addEventListener('submit', async (e) => {

        e.preventDefault()
        let form = e.currentTarget;
        let currFormData = new FormData(form);
        try {
            let objectData = getDataFromForm(currFormData);
            let httpPost = Utils.requestHttpCredentials('PUT', objectData);
            httpPost.headers = {'Content-type': 'application/json', 'X-Authorization': auth.getToken()};
            let url = `${constants.ROOT_URL}data/movies/${_id}`;

            let res = await fetch(url, httpPost);
            if(res.ok){
                let jsonResponse = await res.json();

                let movies = constants.getViews().homePage[3]
                Array.from(movies.querySelectorAll(`div.mb-4`)).forEach(e => {
                    if (e.dataset.movieid === _id) {
                        e.querySelector('.card-title').textContent = `${jsonResponse.title}`;
                    }
                });
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
    callEditMoviePage
};

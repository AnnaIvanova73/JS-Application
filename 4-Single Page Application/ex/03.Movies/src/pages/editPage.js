import moviesService from "../services/moviesService.js";
import {ifIsInvalidThrow} from "../utils/verifications.js";
import viewPort from "../runners/viewPort.js";
import templates from "../uiLayer/templates.js";

let keepRefElement = undefined;
let form = undefined;
const init = (domElement) => {
    keepRefElement = domElement;
    form = keepRefElement.querySelector('form');
    form.addEventListener('submit', postNewMovie);
};

const getPage = async (id) => {
    form.dataset.id = id;
    try {
        let {img, title, description} = await moviesService.getMovie(id);
        keepRefElement.querySelector('input[name=title]').value = title;
        keepRefElement.querySelector('textarea[name=description]').value = description;
        keepRefElement.querySelector('input[name=imageUrl]').value = img;
    } catch (err) {
        console.log(err, 'editPage');
    }
    return keepRefElement

};
const postNewMovie = async (e) => {
    e.preventDefault();
    let movieId = form.dataset.id;
    console.log(movieId)
    let currForm = e.currentTarget;
    let formData = new FormData(currForm);

    try {
        ifIsInvalidThrow([formData.get('title'), formData.get('description'), formData.get('imageUrl')]);
        let data = {title: formData.get('title'), description: formData.get('description'), img: formData.get('imageUrl')};

        let movie = await moviesService.updateMovie(movieId,data);

        await viewPort.navigateTo('details',movieId);
    } catch (err) {
        console.log(err);
    } finally {
        currForm.reset();
    }

};
let editPage = {
    init, getPage
};

export default editPage;
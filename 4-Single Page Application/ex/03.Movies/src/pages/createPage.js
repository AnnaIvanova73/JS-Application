import moviesService from "../services/moviesService.js";
import {ifIsInvalidThrow} from "../utils/verifications.js";
import viewPort from "../runners/viewPort.js";
import templates from "../uiLayer/templates.js";


let keepRefElement = undefined;

const init = (domElement) => {
    keepRefElement = domElement;
    let form = document.querySelector('form');
    form.addEventListener('submit', addMovie);
};

const getPage = async () => {
    return keepRefElement
};

const addMovie = async (e) => {
    e.preventDefault();
    let currForm = e.currentTarget;
    let formData = new FormData(currForm);

    try {
        ifIsInvalidThrow([formData.get('title'), formData.get('description'), formData.get('imageUrl')]);

        let data = {title: formData.get('title'), description: formData.get('description'), img: formData.get('imageUrl')};

         await moviesService.createMovie(data);

        await viewPort.navigateTo('home');

    } catch (err) {
        alert(err);
    } finally {
        currForm.reset();
    }
};
let createPage = {
    init, getPage
};

export default createPage;

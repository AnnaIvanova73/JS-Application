import authService from "../services/authService.js";
import movieService from "../services/moviesService.js";
import constructor from "../uiLayer/templates.js";
import {appendElement, removeChildren} from "../uiLayer/manipulateOnDom.js";

let keepRefElement = undefined;
let navLinkClass = undefined;
const init = (domElement, navLinkSelector) => {
    navLinkClass = navLinkSelector;
    keepRefElement = domElement;
};

const getPage = async () => {

    const container = keepRefElement.querySelector('#movie-container');

    removeChildren(container);

    let dataServer = await movieService.getAllMovies();

    Object.values(dataServer)
        .map(e => constructor.createCardMovie(e.img, e.title, e._id, navLinkClass))
        .forEach(e => appendElement(container, e));

    shouldAddBtnBeHidden();
    return keepRefElement;
};

const shouldAddBtnBeHidden = () => {
    if (authService.isLoggedIn()) {
        keepRefElement.querySelector('#add-movie-button').classList.remove('hidden');
    } else if (keepRefElement !== undefined) {
        keepRefElement.querySelector('#add-movie-button').classList.add('hidden');
    }
};
let homePage = {
    init, getPage, shouldAddBtnBeHidden
};

export default homePage;
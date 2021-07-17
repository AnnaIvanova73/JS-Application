import moviesService from "../services/moviesService.js"
import likesService from "../services/likesService.js"
import construct from "../uiLayer/templates.js"
import viewPort from "../runners/viewPort.js"
import authService from "../services/authService.js"

let keepRefElement = undefined;

const init = (domElement) => {
    keepRefElement = domElement;
};


const getPage = async (id) => {

    try {
        let movieDetails = await moviesService.getMovie(id);
        let {_ownerId, title, description, img} = movieDetails;

        Array.from(keepRefElement.children).forEach(e => e.remove());

        let [domElement, likesElement] = construct.detailedView(_ownerId, title, description, img, id);

        let dataLikes = await getAllMovieLikes();
        let likes = Object.values(dataLikes).filter(e => e.movieId === id);
        let owner = likes.filter(e => e._ownerId === authService.getUserId())
        if (owner.length > 0) {
            likesElement.remove();
        }
        domElement.querySelector('.enrolled-span').textContent = `Likes ${likes ? likes.length : 0}`;
        keepRefElement.appendChild(domElement);
    } catch (err) {
        console.error(err);
    }
    return keepRefElement
};


const deleteMovie = async (id) => {
    await moviesService.deleteMovie(id);
    await viewPort.navigateTo('home');
};
const addLike = async (id) => {
    console.log('in');
    const data = {movieId: id}
    await likesService.addLike(data);
    await viewPort.navigateTo('details', id);
};

const getAllMovieLikes = async (id) => {
    return await likesService.getAllLikes(id);
}
let detailsPage = {
    init, getPage, deleteMovie, addLike
};

export default detailsPage;


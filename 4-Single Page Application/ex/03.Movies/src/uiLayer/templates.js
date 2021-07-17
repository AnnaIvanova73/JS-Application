import utils from "../utils/createElement.js";
import viewPort from "../runners/viewPort.js";
import auth from "../services/authService.js";
import likesService from "../services/likesService.js";


const createCardMovie = (img, title, idMovie, navLinkClass) => {
    let divCardMovie = utils.createElement('div', null, ['class=card mb-4 movie']);

    let imgMovie = utils.createElement('img', null, ['class=card-img-top', `src=${img}`, 'alt=Card image cap', 'width=400']);

    let divCardBody = utils.createElement('div', null, ['class=card-body']);
    let titleElement = utils.createElement('h4', `${title}`);
    divCardBody.appendChild(titleElement);

    let divCardFooter = utils.createElement('div', null, ['class=card-footer']);

    let linkAnchor = utils.createElement('a', null, [`class=${navLinkClass}`, 'data-route=details',
        `data-id=${idMovie}`, `href=#/details/${idMovie}`
    ]);
    let detailsButton = utils.createElement('button', `Details`, ['type=button', 'class=btn btn-info']);
    linkAnchor.appendChild(detailsButton);
    linkAnchor.addEventListener('click', viewPort.onClickTriggerAction);
    divCardFooter.appendChild(linkAnchor);


    utils.appendElementsChildren(divCardMovie, [imgMovie, divCardBody, divCardFooter]);
    return divCardMovie;
};

const detailedView =  (_ownerId, title, description, img, movieId) => {
    let divMovieContainer = utils.createElement('div', null, ['class=container']);
    let divRow = utils.createElement('div', null, ['class=row bg-light text-dark']);
    let titleElement = utils.createElement('h1', `Movie title:${title}`);

    let divColMd8 = utils.createElement('div', null, ['class=col-md-8']);
    let imgElement = utils.createElement('img', null, ['class=img-thumbnail', `src=${img}`, 'alt=Movie']);
    divColMd8.appendChild(imgElement);


    let divColMd4 = utils.createElement('div', null, ['class=col-md-4 text-center']);

    let descriptionElement = utils.createElement('h3', 'Movie Description', ['class=my-3']);
    let paragraphDescriptionElement = utils.createElement('p', description);

    utils.appendElementsChildren(divColMd4, [descriptionElement, descriptionElement]);


    utils.appendElementsChildren(divColMd4, [descriptionElement, paragraphDescriptionElement]);

    const isOwner = _ownerId === auth.getUserId();

    if (isOwner) {
        let deleteAnchor = utils.createElement('a', `Delete`, ['class=btn btn-danger link',
            'data-route=delete', `data-id=${movieId}`,`href=#`]);
        let editAnchor = utils.createElement('a', `Edit`, ['class=btn btn-warning link',
            'data-route=edit', `data-id=${movieId}`,`href=#`]);
        deleteAnchor.addEventListener('click', viewPort.onClickTriggerAction);
        editAnchor.addEventListener('click', viewPort.onClickTriggerAction);
        utils.appendElementsChildren(divColMd4, [deleteAnchor, editAnchor]);
    }
    let likeAnchor = utils.createElement('a', `Like`, ['class=btn btn-primary link',
        'data-route=like', `data-id=${movieId}`,`href=#`]);
    if (auth.isLoggedIn() && !isOwner) {
        likeAnchor.addEventListener('click', viewPort.onClickTriggerAction);
        divColMd4.appendChild(likeAnchor);
    }

    let spanLikesHolder = utils.createElement('span', `Liked 0`, ['class=enrolled-span']);
    divColMd4.appendChild(spanLikesHolder);
    utils.appendElementsChildren(divRow, [titleElement, divColMd8, divColMd4]);
    divMovieContainer.appendChild(divRow);
    return [divMovieContainer,likeAnchor];
}
let constructor = {
    createCardMovie, detailedView
};

export default constructor;

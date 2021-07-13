import Utils from './utils.js';
import Buttons from './buttonsDetailsFunctions.js';
import auth from './auth.js';
import constants from './../constants/constants.js';

const formMoviePreview = ({img, title, _ownerId, _id}) => {
    let divCard = Utils.createElement('div', null,
        ['class=card mb-4', `data-ownerId=${_ownerId}`, `data-movieId=${_id}`]);

    let imgElement = Utils.createElement('img', null,
        ['class=card-img-top', `src=${img}`, 'alt=Card image cap', 'width=400']);

    let divBody = Utils.createElement('div', null, ['class=card-body']);
    let titleElement = Utils.createElement('h4', title, ['class=card-title']);
    divBody.appendChild(titleElement);

    let divFooter = Utils.createElement('div', null, ['class=card-footer']);
    let linkElement = Utils.createElement('a', null, ['href=#']);
    let btnDetails = Utils.createElement('button', 'Details', ['type=button', 'class=btn btn-info'])

    Utils.appendChildren(linkElement, [btnDetails]);
    Utils.appendChildren(divFooter, [linkElement]);
    Utils.appendChildren(divCard, [imgElement, divBody, divFooter]);
    return divCard;
};

const formMovieDetails = async ({title, description, img,_ownerId,_id}) => {
    let divContainer = Utils.createElement('div', null, ['class=container']);
    let divInnerWrapper = Utils.createElement('div', null, ['class=row bg-light text-dark']);
    let titleElement = Utils.createElement('h1', `Movie title:${title}`);

    let divCol = Utils.createElement('div', null, ['class=col-md-8']);
    let imgElement = Utils.createElement('img', null,
        ['class=img-thumbnail', `src=${img}`, 'alt=Movie']);
    divCol.appendChild(imgElement);

    let divFooterWrapper = Utils.createElement('div', null, ['class=col-md-4 text-center']);

    let linkElement = Utils.createElement('h3', 'Movie Description', ['class=my-3']);
    let descriptionElement = Utils.createElement('p', description);

    Utils.appendChildren(divFooterWrapper, [linkElement, descriptionElement]);

    if(auth.getUserId() === _ownerId){
        let btnDelete = Utils.createElement('a', 'Delete', ['class=btn btn-danger']);
        btnDelete.addEventListener('click', async (e) => {
            await Buttons.deleteFunc(e,_id)
        });

        let btnEdit = Utils.createElement('a', 'Edit', ['class=btn btn-warning']);
        btnEdit.addEventListener('click', (e)=> {
            let form =  constants.getViews().editMovie.querySelector('form');
            form.querySelector('input[name=title]').value = title;
            form.querySelector('textarea[name=description]').value = description;
            form.querySelector('input[name=imageUrl]').value = img;
            Buttons.editFunc(e,_id);
        });
        Utils.appendChildren(divFooterWrapper, [btnDelete, btnEdit]);
    }

    let data = await Buttons.getCountCommentsOnMovie(_id);
    let spanAllLikes = Utils.createElement('span', `Liked ${Number(data.length)}`, ['class=enrolled-span']);

    if(auth.getUserId() !== _ownerId){
        let btnLike = Utils.createElement('a', 'Like', ['class=btn btn-primary']);

        btnLike.addEventListener('click',async (e)=> {
            if(!auth.isAuthenticated()){
                alert('You can like, you\'re not logged in!');
            }else{
                await Buttons.likeFunc(e,_ownerId,_id,spanAllLikes);
            }
        });
        Utils.appendChildren(divFooterWrapper, [ btnLike]);
    }

    Utils.appendChildren(divFooterWrapper, [ spanAllLikes]);
    Utils.appendChildren(divInnerWrapper, [titleElement, divCol, divFooterWrapper]);
    divContainer.appendChild(divInnerWrapper);
    return divContainer;
}
export default {
    formMoviePreview, formMovieDetails
}
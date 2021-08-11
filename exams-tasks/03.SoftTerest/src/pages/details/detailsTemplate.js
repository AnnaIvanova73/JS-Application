import {html, nothing} from '../../../node_modules/lit-html/lit-html.js';
 import templates from "../../templates/singleRecordTemplate.js";

const usersBtn = (viewModel) => {
    return html`
        <form class="text-center" method="" action="" @submit=${(e) => viewModel.commentRecord(e,viewModel.idRecord, viewModel.username)}>
            <textarea class="textarea-det" name="newComment" id=""></textarea>
            <button type="submit" class="btn detb">Comment</button>
            <a class="btn detb" href="javascript:void(0)"
               @click=${() => viewModel.likeRecord(viewModel.idRecord)}>Like</a>
        </form>
    `;
};

const creatorBtn = (viewModel) => {
    return html`
        <a class="btn detb" href="javascript:void(0)" @click=${() => viewModel.delRecord(viewModel.idRecord)}>Delete</a>
    `;
};


const getHtml = (viewModel) => {

    return viewModel.totalComments === 0
        ? templates.noComment('No comments yet :(')
        : viewModel.data.map(record => templates.singleComment(record));
};


const getTemplate = (viewModel) => {
    return html`
        <div class="container home some">
            <img class="det-img" src=${viewModel.imageUrl}>
            <div class="desc">
                <h2 class="display-5">${viewModel.title}</h2>
                <p class="infoType">Description:</p>
                <p class="idea-description">${viewModel.description}</p>
                <p class="infoType">Likes:
                    <large>${viewModel.totalLikes}</large>
                </p>
                <p class="infoType">Comments:</p>
                <ul>
                    ${getHtml(viewModel)}
                </ul>
            </div>
            ${viewModel.isLoggedIn
                    ?
                    html`
                        <div class="text-center">
                           
                        </div>
                    `
                    : nothing}
            
        </div>
    `;
};

export default {
    getTemplate
};
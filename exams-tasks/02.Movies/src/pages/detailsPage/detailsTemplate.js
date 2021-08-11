import {html,nothing} from '../../../node_modules/lit-html/lit-html.js';
const displayAllLikes = (viewModel) => {
    return html`
        <span class="enrolled-span">Liked ${viewModel.moviesLikes}</span>
    `;
};
const usersBtn = (viewModel) => {
    return html`
        <a class="btn btn-primary" href="javascript:void(0)" @click=${() => viewModel.likeRecord(viewModel._id)}>Like</a>
      
    `;
};
const creatorBtn = (viewModel) => {
    console.log(viewModel._id);
    return html`
        <a class="btn btn-danger" href="javascript:void(0)" @click=${() => viewModel.deleteRecord(viewModel._id)}>Delete</a>
        <a class="btn btn-warning" href="/edit/${viewModel._id}">Edit</a>
    `;
};

const getTemplate = (viewModel) => {
    console.log(viewModel.isOwner)
    return html`
        <div class="container">
            <div class="row bg-light text-dark">
                <h1>Movie title: ${viewModel.title}</h1>

                <div class="col-md-8">
                    <img class="img-thumbnail" src=${viewModel.img} alt="Movie">
                </div>
                <div class="col-md-4 text-center">
                    <h3 class="my-3 ">Movie Description</h3>
                    <p>${viewModel.description}</p>
                    ${viewModel.isOwner ? creatorBtn(viewModel) : nothing}
                    ${viewModel.hasLiked || viewModel.isOwner ? displayAllLikes(viewModel) : usersBtn(viewModel)}
                </div>
            </div>
        </div>
    `;
};

export default {
    getTemplate
};
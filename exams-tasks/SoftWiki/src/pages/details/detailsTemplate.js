import {html, nothing} from '../../../node_modules/lit-html/lit-html.js';

const creatorBtn = (viewModel) => {
    return html`
        <a href="javascript:void(0)" @click = ${() => viewModel.delRecord(viewModel.idRecord)} class="btn delete">Delete</a>
        <a href="/edit/${viewModel.idRecord}" class="btn edit">Edit</a>
    `;
};
const getTemplate = (viewModel) => {
    return html`
        <div class="container details">
            <div class="details-content">
                <h2>${viewModel.title}</h2>
                <strong>${viewModel.category}</strong>
                <p>${viewModel.content}</p>
                <div class="buttons">
                    ${viewModel.isOwner ? creatorBtn(viewModel) : nothing}
                    <a href="/home" class="btn edit">Back</a>
                </div>
            </div>
        </div>
    `;
};

export default {
    getTemplate
};
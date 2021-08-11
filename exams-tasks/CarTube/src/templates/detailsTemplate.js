import {html} from '../../node_modules/lit-html/lit-html.js';

const creatorBtn = (viewModel) => {
    console.log(viewModel._id)
    return html`
        <div class="listings-buttons">
            <a href="/edit/${viewModel._id}" class="button-list">Edit</a>
            <a href="javascript:void(0)" class="button-list" @click = ${() => viewModel.deleteRecord(viewModel._id)}>Delete</a>
        </div>
    `;
};
const getTemplate = (viewModel) => {
    return html`
        <section id="listing-details">
            <h1>Details</h1>
            <div class="details-info">
                <img src=${viewModel.imageUrl}>
                <hr>
                <ul class="listing-props">
                    <li><span>Brand:</span>${viewModel.brand}</li>
                    <li><span>Model:</span>${viewModel.model}</li>
                    <li><span>Year:</span>${viewModel.year}</li>
                    <li><span>Price:</span>${viewModel.price}$</li>
                </ul>

                <p class="description-para">${viewModel.description}</p>

                ${viewModel.isOwner && creatorBtn(viewModel)}
            </div>
        </section>`;
};

export default {
    getTemplate
};
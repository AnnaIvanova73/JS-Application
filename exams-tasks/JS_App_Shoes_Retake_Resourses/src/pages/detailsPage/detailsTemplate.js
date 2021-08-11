import {html, nothing} from '../../../node_modules/lit-html/lit-html.js';

const usersBtn = (viewModel) => {
    return viewModel.isAlreadyBoughtIt ? html`
                <span>You bought it</span>
        `
        : html`
                <a href="javascript:void(0)" @click=${() => viewModel.buyRecord(viewModel._id, viewModel.data)}>Buy</a>
        `;
};
const creatorBtn = (viewModel) => {
    console.log(viewModel._id);
    return html`
        <a href=/edit/${viewModel._id}>Edit</a>
        <a href="javascript:void(0)" @click=${() => viewModel.deleteRecord(viewModel._id)}>Delete</a>

    `;
};

const getTemplate = (viewModel) => {
    return html`
        <div class="offer-details">
            <h1>${viewModel.title}</h1>
            <div class="info">
                <img src=${viewModel.img} alt="">
                <div class="description"> ${viewModel.description}
                    <br>
                    <br>
                    <p class="buyers">Buyers: ${viewModel.totalBuyers}</p>
                    <br>
                    <p class="price">$${viewModel.price}</p>
                </div>
            </div>
            <div class="actions">
                ${viewModel.isOwner ? creatorBtn(viewModel) : usersBtn(viewModel)}
            </div>
        </div>
        <footer>
            <p><a href="https://softuni.bg">Software University</a> - JS Applications @ 2020</p>
        </footer>
    `;
};

export default {
    getTemplate
};
import {html,nothing} from '../../../node_modules/lit-html/lit-html.js';

const creatorBtn = (viewModel) => {
    console.log(viewModel._id);
    return html`
        <div>
            <a href="/edit/${viewModel._id}" class="btn btn-info">Edit</a>
            <a href="javascript:void(0)" class="btn btn-red" @click=${() => viewModel.deleteRecord(viewModel._id)}>Delete</a>
        </div>
    `;
};
const getTemplate = (viewModel) => {
    return html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Furniture Details</h1>
            </div>
        </div>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src=${viewModel.img}>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <p>Make: <span>${viewModel.make}</span></p>
                <p>Model: <span>${viewModel.model}</span></p>
                <p>Year: <span>${viewModel.year}</span></p>
                <p>Description: <span>${viewModel.description}</span></p>
                <p>Price: <span>${viewModel.price}</span></p>
                <p>Material: <span>${viewModel.material}</span></p>

                ${viewModel.isOwner ? creatorBtn(viewModel) : nothing}
            </div>
        </div>
    `;
};

export default {
    getTemplate
};
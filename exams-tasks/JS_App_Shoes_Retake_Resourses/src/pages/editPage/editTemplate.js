import {html, nothing} from '../../../node_modules/lit-html/lit-html.js';

const edit = (viewModel) => {
    return html`
        <h1>Edit Offer</h1>
        <p class="message"></p>
        <form @submit=${(e) => {
            viewModel.editRecord(e, viewModel._id);
        }}>
            <div>
                <input type="text" placeholder="Name..." value=${viewModel.title} name="title">
            </div>
            <div>
                <input type="text" value=${viewModel.price} placeholder="Price..." name="price">
            </div>
            <div>
                <input type="text" value=${viewModel.img} placeholder="Image url..." name="img">
            </div>
            <div>
                <textarea placeholder="Give us some description about this offer..." name="description">
                    ${viewModel.description}
                </textarea>
            </div>
            <div>
                <input type="text" placeholder="Brand..."   value=${viewModel.brand} name="brand">
            </div>
            <div>
                <button>Edit</button>
            </div>
        </form>

    `;
};

export default {
    edit
};

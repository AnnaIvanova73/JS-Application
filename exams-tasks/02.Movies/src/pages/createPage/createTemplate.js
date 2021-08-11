import {html} from '../../../node_modules/lit-html/lit-html.js';

const getFlag = (e, func, funcParam = undefined, funcParam2 = undefined) => {
    let val = e.target.value.trim();
    if (func(val, funcParam, funcParam2)) {
        e.target.classList.remove('is-invalid');
        e.target.classList.add('is-valid');
    } else {
        e.target.classList.remove('is-valid');
        e.target.classList.add('is-invalid');
    }
};
const createTemplate = (viewModel) => {
    return html`
        <form class="text-center border border-light p-5" @submit=${(e) => {
            viewModel.createRecord(e, viewModel._id);
        }}>
                <h1>Add Movie</h1>
                <div class="form-group">
                    <label for="title">Movie Title</label>
                    <input type="text" class="form-control" placeholder="Title" name="title" value="">
                </div>
                <div class="form-group">
                    <label for="description">Movie Description</label>
                    <textarea class="form-control" placeholder="Description" name="description"></textarea>
                </div>
                <div class="form-group">
                    <label for="imageUrl">Image url</label>
                    <input type="text" class="form-control" placeholder="Image Url" name="imageUrl" value="">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>

    `;
};

export default {
    createTemplate
};
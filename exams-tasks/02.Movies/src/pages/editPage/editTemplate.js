import {html} from '../../../node_modules/lit-html/lit-html.js';
import {ifDefined} from '../../../node_modules/lit-html/directives/if-defined.js';
/*

 */
/*
invalidFields
class="form-control${form.invalidFields.model ? ' is-invalid' : ' is-valid'}"
//viewModel.controlClassesInputFields.isValidNumberCount() ? html`class="is-valid"`
//                                        :  html`is-invalid`
hasClass
class=${ifDefined(viewModel.currPage.startsWith('/create') ? 'active' : undefined)}
 */
//viewModel.controlClassesInputFields.isValidNumberCount

const edit = (viewModel) => {
    return html`
        <form class="text-center border border-light p-5" @submit=${(e)=> {
            viewModel.createRecord(e,viewModel._id)
        }}>
                <h1>Edit Movie</h1>
                <div class="form-group">
                    <label for="title">Movie Title</label>
                    <input type="text" class="form-control" placeholder="Movie Title" value=${viewModel.title} name="title">
                </div>
                <div class="form-group">
                    <label for="description">Movie Description</label>
                    <textarea class="form-control" placeholder="Movie Description..." name="description" >${viewModel.description}</textarea>
                </div>
                <div class="form-group">
                    <label for="imageUrl">Image url</label>
                    <input type="text" class="form-control" placeholder="Image Url" value=${viewModel.img} name="imageUrl">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
    `;
};

export default {
    edit
};

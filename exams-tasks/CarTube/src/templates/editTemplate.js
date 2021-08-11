import {html} from '../../node_modules/lit-html/lit-html.js';
// import {ifDefined} from '../../node_modules/lit-html/directives/if-defined.js';

const edit = (viewModel) => {

    return html `
        <section id="edit-listing">
            <div class="container">

                <form id="edit-form"  @submit=${(e)=> {
                    viewModel.createRecord(e,viewModel._id)
                }}>
                    <h1>Edit Car Listing</h1>
                    <p>Please fill in this form to edit an listing.</p>
                    <hr>

                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand" value=${viewModel.brand}>

                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model" value=${viewModel.model}>

                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description" value=${viewModel.description}>

                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year" value=${Number(viewModel.year)}>

                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl" value=${viewModel.imageUrl}>

                    <p>Car Price</p>
                    <input type="number" placeholder="Enter Car Price" name="price" value=${Number(viewModel.price)}>

                    <hr>
                    <input type="submit" class="registerbtn" value="Edit Listing">
                </form>
            </div>
        </section>`
};

export default{
    edit
}
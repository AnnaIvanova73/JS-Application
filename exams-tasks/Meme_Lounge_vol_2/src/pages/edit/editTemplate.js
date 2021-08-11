import { html} from '../../../node_modules/lit-html/lit-html.js'

const edit = (viewModel) => {
    return html `
        <section id="edit-meme">
            <form id="edit-form" @submit=${(e)=> {
                viewModel.createRecord(e,viewModel.idRecord)
            }}>
                <h1>Edit Meme</h1>
                <div class="container">
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title" .value=${viewModel.title}>
                    <label for="description">Description</label>
                   
                    <textarea id="description" placeholder="Enter Description" name="description">
                          ${viewModel.description}
                        </textarea>
                    <label for="imageUrl">Image Url</label>
                    <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${viewModel.imageUrl}>
                    <input type="submit" class="registerbtn button" value="Edit Meme">
                </div>
            </form>
        </section>
    `;
};

export default{
    edit
}
import {html, nothing} from  '../../../node_modules/lit-html/lit-html.js';

const create = (viewModel) => {
    return html`
        
        <h1>Create New Offer</h1>
        <p class="message"></p>
        <form @submit=${(e) => {
            viewModel.createRecord(e, viewModel._id);
        }}>
            <div>
                <input type="text" name="title" placeholder="Name...">
            </div>
            <div>
                <input type="text" name="price" placeholder="Price...">
            </div>
            <div>
                <input type="text" name="img" placeholder="Image url...">
            </div>
            <div>
                <textarea name="description" placeholder="Give us some description about this offer..."></textarea>
            </div>
            <div>
                <input name="brand" type="text" placeholder="Brand...">
            </div>
            <div>
                <button>Create</button>
            </div>
        </form>
    
    `;
};

export default{
    create
}
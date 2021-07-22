import {html,render} from './../../node_modules/lit-html/lit-html.js';
const renderUserFurniture = (data) => {
    return html`
        <div class="container">
            <div class="row space-top">
                <div class="col-md-12">
                    <h1>My Furniture</h1>
                    <p>This is a list of your publications.</p>
                </div>
            </div>
            <div class="row space-top">
                ${data.map(e => html`${createElements(e)}`)}
            </div>
        </div>
    `
};
const createElements = (data) => {

    return html `
        <div class="col-md-4">
            <div class="card text-white bg-primary">
                <div class="card-body">
                    <img src=${data.img} />
                    <p>${data.description}</p>
                    <footer>
                        <p>Price: <span>${data.price} $</span></p>
                    </footer>
                    <div>
                        <a href="/details/${data._id}" class="btn btn-info">Details</a>
                    </div>
                </div>
            </div>
        </div>
    `
};

export default {
    renderUserFurniture,render
};
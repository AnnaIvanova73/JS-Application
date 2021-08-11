import {html} from '../../../node_modules/lit-html/lit-html.js';


const noMemes = () => html`<p class="no-cars"> You haven't listed any cars yet.</p>`;

const createSingleRecord = (e) => {
    return html`
        <div class="listing">
            <div class="preview">
                <img src=${e.imageUrl}>
            </div>
            <h2>${e.brand} ${e.model}</h2>
            <div class="info">
                <div class="data-info">
                    <h3>Year: ${e.year}</h3>
                    <h3>Price: ${e.price} $</h3>
                </div>
                <div class="data-buttons">
                    <a href="/details/${e._id}" class="button-carDetails">Details</a>
                </div>
            </div>
        </div>
    `;
};
const getHtml = (viewModel) => {
    return viewModel.count === 0 ? noMemes()
        :  viewModel.data.map(e=> createSingleRecord(e))
};

const userRecords = (viewModel) => {
    return html`
        <section id="my-listings">
            <h1>My car listings</h1>
            <div class="listings">
                ${getHtml(viewModel)}
            </div>
        </section>
        `;
};

export default {
    userRecords
};

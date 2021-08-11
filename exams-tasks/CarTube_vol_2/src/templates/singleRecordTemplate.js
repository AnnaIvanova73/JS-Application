import {html} from '../../node_modules/lit-html/lit-html.js';

const noRecords = (msg) => html` <p class="no-cars">${msg}</p>`;

const createSingleRecord = (record) => {
    return html`
        <div class= "listing">
            <div class="preview">
                <img src=${record.imageUrl}>
            </div>
            <h2>${record.brand} ${record.model}</h2>
            <div class="info">
                <div class="data-info">
                    <h3>Year: ${record.year}</h3>
                    <h3>Price: ${record.price} $</h3>
                </div>
                <div class="data-buttons">
                    <a href=/details/${record._id} class="button-carDetails">Details</a>
                </div>
            </div>
        </div>
    `;
};

export default {
    noRecords, createSingleRecord
};

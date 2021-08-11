import {html} from '../../node_modules/lit-html/lit-html.js';

const noRecords = (msg) => html` <p class="no-books">${msg}</p>`;

const createSingleRecord = (record) => {
    return html`
        <li class="otherBooks">
            <h3>${record.title}</h3>
            <p>Type: ${record.type}</p>
            <p class="img"><img src=${record.imageUrl}></p>
            <a class="button" href=/details/${record._id}>Details</a>
        </li>
    `;
};

export default {
    noRecords, createSingleRecord
};

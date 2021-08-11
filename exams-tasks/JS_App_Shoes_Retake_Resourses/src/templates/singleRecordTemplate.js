import {html} from '../../node_modules/lit-html/lit-html.js';

const noRecords = (msg) => html`<h1>${msg}</h1>`;

const createSingleRecord = (record, redirect) => {
    console.log(record);
    return html`
        <div class="shoe" @click=${() => redirect(record._id)}>
            <img src=${record.img} alt="">
            <h3>${record.title}</h3>
            <a>Buy it for $${record.price}</a>
        </div>

    `;
};

export default {
    noRecords, createSingleRecord
};

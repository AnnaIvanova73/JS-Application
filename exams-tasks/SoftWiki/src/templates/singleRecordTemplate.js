import {html} from '../../node_modules/lit-html/lit-html.js';


const noRecords = (msg) => html`<h3 class="no-articles">${msg}</h3>`;

const createSingleRecord = (record) => {
    return html`
        <article>
            <h3>${record.title}</h3>
            <p>${record.content}</p>
            <a  href=/details/${record._id}  class="btn details-btn">Details</a>
        </article>
    `;
};

export default {
    noRecords, createSingleRecord
};

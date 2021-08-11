import {html} from '../../node_modules/lit-html/lit-html.js';

const noRecords = (msg) => html`<p class="no-memes">${msg}</p>`;

const createSingleRecord = (record, user= undefined) => {
    return html`
        <div class= ${user=== undefined ? "meme" : "user-meme"}>
            <div class="card">
                <div class="info">
                    <p class="meme-title">${record.title}</p>
                    <img class="meme-image" alt="meme-img" src=${record.imageUrl}>
                </div>
                <div id="data-buttons">
                    <a class="button" href=/details/${record._id}>Details</a>
                </div>
            </div>
        </div>
    `;
};

export default {
    noRecords, createSingleRecord
};

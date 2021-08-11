import {html} from '../../node_modules/lit-html/lit-html.js';

export const createSingleRecord = (e) => {
    return html`
        <div class="card mb-4">
            <img class="card-img-top" src=${e.img}
                 width="400">
            <div class="card-body">
                <h4 class="card-title">${e.title}</h4>
            </div>
            <div class="card-footer">
                <a href=/details/${e._id}>
                    <button type="button" class="btn btn-info">Details</button>
                </a>
            </div>
        </div>
    `;
};
export const noRecords = (msg) => html`<p class="no-memes">${msg}</p>`;

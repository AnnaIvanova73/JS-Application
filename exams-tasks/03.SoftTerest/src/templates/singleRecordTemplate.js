import {html} from '../../node_modules/lit-html/lit-html.js';

const noRecords = (msg) => html` <h1 class="no-cars">${msg}</h1>`;

//  await page.click('div.card:has-text("111111") >> text=Details');
const createSingleRecord = (record) => {
    return html`
        <div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
            <div class="card-body">
                <p class="card-text">${record.title}</p>
            </div>
            <img class="card-image" src=${record.img} alt="Card image cap">
            <a href=/details/${record._id} class="btn" >Details</a>
        </div>
    `;
};

const noComment = (msg) => html` <h1 class="no-cars">${msg}</h1>`;

const singleComment = (viewModel) => {
    return html`
        <li class="comment">${viewModel.content}</li>
    `;
};

export default {
    noRecords, createSingleRecord,singleComment,noComment
};

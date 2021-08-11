import {html} from '../../../node_modules/lit-html/lit-html.js';
import templates from '../../templates/singleRecordTemplate.js';

const getHtml = (viewModel) => {
    return viewModel.countRecords === 0

        ? templates.noRecords('No books in database!')

        : html`
                <ul class="other-books-list">${viewModel.data.map(record => templates.createSingleRecord(record))}
                </ul>`;
};

const allRecords = (viewModel) => {
    console.log(viewModel);
    return html`
        <section id="dashboard-page" class="dashboard">
            <h1>Dashboard</h1>
            ${getHtml(viewModel)}
        </section>
    `;
};

export default {
    allRecords
};

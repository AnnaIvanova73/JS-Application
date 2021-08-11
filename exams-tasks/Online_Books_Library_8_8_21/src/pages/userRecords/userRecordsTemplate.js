import {html} from '../../../node_modules/lit-html/lit-html.js';
import templates from '../../templates/singleRecordTemplate.js';


const getHtml = (viewModel) => {
    return viewModel.countRecords === 0 ? templates.noRecords(`No books in database!`)
        :  html`
                <ul class="my-books-list">${viewModel.data.map(record => templates.createSingleRecord(record))}
                </ul>`;
};

const userRecords = (viewModel) => {
    console.log(viewModel)
    return html`

        <section id="my-books-page" class="my-books">
            <h1>My Books</h1>
            ${getHtml(viewModel)}
        </section>
    `;
};
export default {
    userRecords
};

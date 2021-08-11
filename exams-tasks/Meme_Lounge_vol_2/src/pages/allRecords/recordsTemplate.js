import {html} from  '../../../node_modules/lit-html/lit-html.js';
import templates from '../../templates/singleRecordTemplate.js';

const getHtml = (viewModel) => {
    return viewModel.countRecords === 0

        ? templates.noRecords('No memes in database.')

        :  viewModel.data.map(record=> templates.createSingleRecord(record))
};

const allRecords = (viewModel) => {
    //console.log(viewModel);
    return html`
        <section id="meme-feed">
            <h1>All Memes</h1>
            <div id="memes">
                ${getHtml(viewModel)}
            </div>
        </section>
    `;
};

export default {
    allRecords
};

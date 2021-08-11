import {html} from  '../../../node_modules/lit-html/lit-html.js';
import templates from '../../templates/singleRecordTemplate.js';

const getHtml = (viewModel) => {
    return viewModel.countRecords === 0

        ? templates.noRecords('No ideas yet! Be the first one :)')

        :  viewModel.data.map(record=> templates.createSingleRecord(record))
};

const allRecords = (viewModel) => {

    return html`
        <div id="dashboard-holder" class="view" data-route="dashboard">
            ${getHtml(viewModel)}
        </div>
    `;
};

export default {
    allRecords
};

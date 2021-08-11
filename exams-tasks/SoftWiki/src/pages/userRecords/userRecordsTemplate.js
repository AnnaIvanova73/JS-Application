import {html} from '../../../node_modules/lit-html/lit-html.js';
import templates from '../../templates/singleRecordTemplate.js';


const getHtml = (viewModel) => {
    return viewModel.countRecords === 0 ? templates.noRecords(`You haven't listed any cars yet.`)
        : viewModel.data.map(record => templates.createSingleRecord(record, true));
};

const userRecords = (viewModel) => {
    return html`
        <section id="my-listings">
            <h1>My car listings</h1>
            <div class="listings">
                ${getHtml(viewModel)}
            </div>
        </section>
    `;
};
//${ifDefined(viewModel.currPage.startsWith('/my-profile') ? 'active' : undefined)
export default {
    userRecords
};

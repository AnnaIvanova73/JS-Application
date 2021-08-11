import {html} from '../../../node_modules/lit-html/lit-html.js';
import {createSingleRecord} from '../../templates/singleRecordTemplate.js'
const allRecords = (viewModel) => {
    console.log(viewModel);
    return html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Welcome to Furniture System</h1>
                <p>Select furniture from the catalog to view details.</p>
            </div>
        </div>
        <div class="row space-top">
            ${Object.keys(viewModel).length === 0 ? nothing :viewModel.data.map(record => createSingleRecord(record))}
        </div>
    `;
};

export default {
    allRecords
};

import {html} from  '../../../node_modules/lit-html/lit-html.js';
import templates from '../../templates/singleRecordTemplate.js';

const getHtml = (viewModel) => {
    return viewModel.countRecords === 0

        ? templates.noRecords('No cars in database.')

        :  viewModel.data.map(record=> templates.createSingleRecord(record))
};

const allRecords = (viewModel) => {
    console.log(viewModel);
    return html`
        <section id="car-listings">
            <h1>Car Listings</h1>
            <div class="listings">
                ${getHtml(viewModel)}
            </div>
        </section>
    `;
};

export default {
    allRecords
};

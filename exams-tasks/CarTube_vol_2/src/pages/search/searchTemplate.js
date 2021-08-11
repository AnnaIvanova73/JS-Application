import {html,nothing} from '../../../node_modules/lit-html/lit-html.js';
import templates from '../../templates/singleRecordTemplate.js';

const getHtml = (viewModel) => {
    return viewModel.countRecords === 0

        ? templates.noRecords('No results.')

        : viewModel.data.map(record => templates.createSingleRecord(record));
};

const displaySearch = (viewModel) => {
    return html`
        <section id="search-cars">
            <h1>Filter by year</h1>
            <div class="container">
                <input id="search-input" type="text" name="search" placeholder="Enter desired production year"
                       @change=${(e)=> {viewModel.getInput(e,viewModel.idRecord)}}
                >
                <button class="button-list" @click=${(e)=> {viewModel.search(e,viewModel.idRecord)}}>Search</button>
            </div>
            <h2>Results:</h2>
            <div class="listings">
                ${viewModel.shouldSearch ? getHtml(viewModel) : nothing}
            </div>
        </section>
    `;
};

export default {
    displaySearch
};

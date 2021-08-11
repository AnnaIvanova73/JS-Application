import {html, nothing} from  '../../../node_modules/lit-html/lit-html.js';
import templates from '../../templates/singleRecordTemplate.js';

const getHtml = (viewModel,redirect) => {
    return viewModel.countRecords === 0
        ? templates.noRecords('No shoes to display. Be the first to create a new offer...')
        :  viewModel.data.map(record=> templates.createSingleRecord(record,redirect))
};

const allRecords = (viewModel,redirect) => {
    return html`
        <div class="shoes">
            ${getHtml(viewModel,redirect)}
        </div>
        <br>
        <br>
        <footer>
            <p><a href="https://softuni.bg">Software University</a> - JS Applications @ 2020</p>
        </footer>
    `;
};

export default {
    allRecords
};
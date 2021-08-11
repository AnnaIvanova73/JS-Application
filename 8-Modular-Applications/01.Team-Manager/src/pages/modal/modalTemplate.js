import {html} from '../../../node_modules/lit-html/lit-html.js';

const modal = (viewModel) => {
    return html`
        <div class="overlay">
            <div class="modal" id="notifications">
                <p>${viewModel.message}</p>
                <a href="javascript:void(0)" @click=${(e) => viewModel.handler(true, e)} class="action">Accept</a>
                <a href="javascript:void(0)" @click=${(e) => viewModel.handler(false, e)} class="action">Cancel</a>
            </div>
        </div>
    `;

};

export default {
    modal
};

import {html} from '../../node_modules/lit-html/lit-html.js';

const notifications = (msg) => {
    return html`
        <div id="errorBox" class="notification">
            <span>${msg}</span>
        </div>
    `;
};
export default {
    notifications
};
import {html,nothing} from '../../node_modules/lit-html/lit-html.js';

const getNothing = (val = true) => html`${val ? nothing : ''}`;

const notifications = (msg) => {
    return html`
            <div id="errorBox" class="notification" style="display:block;">
                <span>${msg}</span>
            </div>
    `;
};

export default {
    getNothing, notifications
};

import {html} from '../../node_modules/lit-html/lit-html.js';

const notifications = (msg, isPositive) => {
    return isPositive
        ? html`
                <p class="notification-message" id="successBox">${msg}</p>
        ` :
        html`
            <p class="notification-message" id="errorBox">${msg}</p>
        `
        ;
};

export default {
    notifications
};
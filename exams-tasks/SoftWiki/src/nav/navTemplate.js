import {ifDefined} from '../../node_modules/lit-html/directives/if-defined.js';
import {html} from '../../node_modules/lit-html/lit-html.js';

//class=${ifDefined(viewModel.currPage.startsWith('/login') ? 'active' : undefined)}
const navTemplate = (viewModel) => {
    return html`
        ${viewModel.isLoggedIn
                ?
                html`
                    <a href="/create">Create</a>
                    <a href="javascript:void(0)" @click=${viewModel.logout}>Logout</a>
                `
                :
                html`
                    <a href="/register">Register</a>
                `
        }

    `;
};


export default {
    navTemplate
};

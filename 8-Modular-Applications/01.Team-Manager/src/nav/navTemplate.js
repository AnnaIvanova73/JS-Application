import {getTemplatingFunc} from '../litTemplater/litTemplater.js';
import {ifDefined} from '../../node_modules/lit-html/directives/if-defined.js';

const navTemplate = ((html) => (viewModel) => html`
   
    ${viewModel.isLoggedIn
            ? html`
                <a href="/allRecords" class="action">Browse Teams</a>
                <a href="/userRecords" class="action">My Teams</a>
                <a href="javascript:void(0)" class="action" @click=${viewModel.logout}>Logout</a>
            `
            :
            html`
                <a href="/allRecords" class="action">Browse Teams</a>
                <a href="/login" class="action">Login</a>
                <a href="/register" class="action">Register</a>
            `}

`)(getTemplatingFunc());

export default {
    navTemplate
};

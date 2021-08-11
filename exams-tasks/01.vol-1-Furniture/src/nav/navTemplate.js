import {getTemplatingFunc} from '../litTemplater/litTemplater.js';
import {ifDefined} from '../../node_modules/lit-html/directives/if-defined.js';


const navTemplate = ((html) => (viewModel) => html`
    <a id="catalogLink" href="/home" class=${ifDefined(viewModel.currPage.startsWith('/home') ? 'active' : undefined)}>Dashboard</a>
    ${viewModel.isLoggedIn
            ? html`
                <div id="user">
                    <a id="createLink" href="/create" class=${ifDefined(viewModel.currPage.startsWith('/create') ? 'active' : undefined)}>Create Furniture</a>
                    <a id="logoutBtn" href="javascript:void(0)" @click=${viewModel.logout}>Logout</a>
                </div>
            `
            :
            html`
                <div id="guest">
                    <a id="loginLink" href="/login" class=${ifDefined(viewModel.currPage.startsWith('/login') ? 'active' : undefined)}>Login</a>
                    <a id="registerLink" href="/register" class=${ifDefined(viewModel.currPage.startsWith('/register') ? 'active' : undefined)}>Register</a>
                </div>
            `
    }`)(getTemplatingFunc());

export default {
    navTemplate
};

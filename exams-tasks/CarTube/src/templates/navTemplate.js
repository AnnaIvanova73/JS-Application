import {getTemplatingFunc} from '../litTemplater/litTemplater.js';
import {ifDefined} from '../../node_modules/lit-html/directives/if-defined.js';


const navTemplate = ((html) => (viewModel) => html`
    <a href="/home" class=${ifDefined(viewModel.currPage.startsWith('/home') ? 'active' : undefined)}>Home</a>
    <a href="/allRecords" class=${ifDefined(viewModel.currPage.startsWith('/allRecords') ? 'active' : undefined)}>All
        Listings</a>
    <a href="/by-year" class=${ifDefined(viewModel.currPage.startsWith('/by-year') ? 'active' : undefined)}>By Year</a>
    ${viewModel.isLoggedIn
            ? html`
                <div id="profile">
                    <a>Welcome ${viewModel.username}</a>
                    <a href="/userRecords"
                       class=${ifDefined(viewModel.currPage.startsWith('/userRecords') ? 'active' : undefined)}>My
                        Listings</a>
                    <a href="/create"
                       class=${ifDefined(viewModel.currPage.startsWith('/create') ? 'active' : undefined)}>Create
                        Listing</a>
                    <a href="javascript:void(0)" @click=${viewModel.logout}>Logout</a>
                </div>
            `
            :
            html`
                <div id="guest">
                    <a href="/login" class=${ifDefined(viewModel.currPage.startsWith('/login') ? 'active' : undefined)}>Login</a>
                    <a href="/register"
                       class=${ifDefined(viewModel.currPage.startsWith('/register') ? 'active' : undefined)}>Register</a>
                </div>`
    }`)(getTemplatingFunc());

export default {
    navTemplate
};

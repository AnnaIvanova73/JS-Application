import {ifDefined} from '../../node_modules/lit-html/directives/if-defined.js';
import {html} from '../../node_modules/lit-html/lit-html.js';

//class=${ifDefined(viewModel.currPage.startsWith('/login') ? 'active' : undefined)}
const navTemplate = (viewModel) => {
    return html`
        <section class="navbar-dashboard">
            <a href="/home">Dashboard</a>

            ${viewModel.isLoggedIn
                    ?
                    html`
                        <div id="user">
                            <span>Welcome, ${viewModel.email}</span>
                            <a class="button" href="/userRecords">My Books</a>
                            <a class="button" href="/create">Add Book</a>
                            <a class="button" "javascript:void(0)" @click=${viewModel.logout}>Logout</a>
                        </div>
                    `
                    :
                    html`
                        <div id="guest">
                            <a class="button" href="/login">Login</a>
                            <a class="button" href="/register">Register</a>
                        </div>
                    `
            }
        </section>
    `;
};


export default {
    navTemplate
};

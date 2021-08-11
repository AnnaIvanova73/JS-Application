import {ifDefined} from '../../node_modules/lit-html/directives/if-defined.js';
import {html} from '../../node_modules/lit-html/lit-html.js';

//
const navTemplate = (viewModel) => {
    return html`
        <div class="container">
            <a class="navbar-brand" href="/home">
                <img src="../../images/idea.png" alt="">
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                    aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                
                <ul class="navbar-nav ml-auto">
                    ${viewModel.isLoggedIn
                            ?
                            html`
                                <li class=${ifDefined(viewModel.currPage.startsWith('/allRecords') ? 'nav-item active' : undefined)}">
                                    <a class="nav-link" href="/allRecords">Dashboard</a>
                                </li>
                                <li class=${ifDefined(viewModel.currPage.startsWith('/create') ? 'nav-item active' : undefined)}">
                                    <a class="nav-link" href="/create">Create</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="javascript:void(0)" @click=${viewModel.logout}>Logout</a>
                                </li>
                            `
                            :
                            html`
                                <li class=${ifDefined(viewModel.currPage.startsWith('/allRecords') ? 'nav-item active' : undefined)}">
                                    <a class="nav-link" href="/allRecords">Dashboard</a>
                                </li>
                                <li class=${ifDefined(viewModel.currPage.startsWith('/login') ? 'nav-item active' : undefined)}">
                                    <a class="nav-link" href="/login">Login</a>
                                </li>
                                <li class=${ifDefined(viewModel.currPage.startsWith('/register') ? 'nav-item active' : undefined)}">
                                    <a class="nav-link" href="/register">Register</a>
                                </li>
                            `
                    }
                    
                </ul>
            </div>
        </div>
    `;
};


export default {
    navTemplate
};

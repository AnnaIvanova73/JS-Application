import {getTemplatingFunc} from '../litTemplater/litTemplater.js';
import {ifDefined} from '../../node_modules/lit-html/directives/if-defined.js';


const navTemplate = ((html) => (viewModel) => html`
    <a class="navbar-brand text-light"
       href="/home">Movies</a>
    ${viewModel.isLoggedIn
            ? html`
                <ul class="navbar-nav ml-auto ">
                    <li class="nav-item">
                        <a class="nav-link">Welcome, ${viewModel.email}</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="javascript:void(0)" @click=${viewModel.logout}>Logout</a>
                    </li>
                </ul>
            `
            :
            html`
                <ul class="navbar-nav ml-auto ">
                    <li class="nav-item">
                        <a href="/login"
                           class="nav-link"
                        >Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link"
                           href="/register">Register</a>
                    </li>
                </ul>
            `
    }`)(getTemplatingFunc());

export default {
    navTemplate
};

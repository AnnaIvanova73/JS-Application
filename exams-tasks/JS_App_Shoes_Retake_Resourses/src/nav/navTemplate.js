import {getTemplatingFunc} from '../litTemplater/litTemplater.js';
import {ifDefined} from '../../node_modules/lit-html/directives/if-defined.js';


const navTemplate = ((html) => (viewModel) => html`
    ${viewModel.isLoggedIn
            ? html`
                <ul>
                    <li>
                        <a href=/create >Create new offer</a>
                    </li>
                    <li>
                        <a href="/allRecords">
                            <img src="../../public/sneakers.png" alt="">
                        </a>
                    </li>
                    <li>Welcome, ${viewModel.email} |
                        <a   href="javascript:void(0)" @click=${viewModel.logout}>Logout</a>
                    </li>
                </ul>
            `
            :
            html`
                <ul>
                    <li class="site-logo">Shoe</li>
                    <li>
                        <a href="/allRecords">
                            <img src="../../public/sneakers.png" alt="">
                        </a>
                    </li>
                    <li class="site-logo">Shelf</li>
                </ul>
            `
    }`)(getTemplatingFunc());

export default {
    navTemplate
};

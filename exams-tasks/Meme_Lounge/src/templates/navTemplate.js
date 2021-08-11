import {getTemplatingFunc} from '../litTemplater/litTemplater.js';
import {ifDefined} from '../../node_modules/lit-html/directives/if-defined.js';
//
const navTemplate = ((html) => (viewModel) => html`
    <a href="/meme-feed" class=${ifDefined(viewModel.currPage.startsWith('/meme-feed') ? 'active' : undefined)}>All Memes</a>
    ${viewModel.isLoggedIn
    ? html`

                <div class="user">
                    <a href="/create" class=${ifDefined(viewModel.currPage.startsWith('/create') ? 'active' : undefined)}>Create Meme</a>
                    <div class="profile">
                        <span>Welcome, ${viewModel.email}</span>
                        <a href="/my-profile/${viewModel.nameUser}" class=${ifDefined(viewModel.currPage.startsWith('/my-profile') ? 'active' : undefined)}>My Profile</a>
                        <a href="javascript:void(0)" @click=${viewModel.logout}>Logout</a>
                    </div>
                </div>`
    :
    html`
                <div class="guest">
                    <div class="profile">
                        <a href="/login"  class=${ifDefined(viewModel.currPage.startsWith('/login') ? 'active' : undefined)}>Login</a>
                        <a href="/register"  class=${ifDefined(viewModel.currPage.startsWith('/register') ? 'active' : undefined)}>Register</a>
                    </div>
                    <a  href="/home"  class=${ifDefined(viewModel.currPage.startsWith('/home') ? 'active' : undefined)}>Home Page</a>
                </div>`}

`)(getTemplatingFunc());

export default {
    navTemplate
};

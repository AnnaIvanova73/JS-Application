import {ifDefined} from '../../node_modules/lit-html/directives/if-defined.js';
import {html} from '../../node_modules/lit-html/lit-html.js';

//class=${ifDefined(viewModel.currPage.startsWith('/login') ? 'active' : undefined)}
const navTemplate = (viewModel) => {
    return html`
        <a href="/allRecords" class=${ifDefined(viewModel.currPage.startsWith('/allRecords') ? 'active' : undefined)}>All Memes</a>
        ${viewModel.isLoggedIn
                ? 
                html`
                    <div class="user">
                        <a href="/create" class=${ifDefined(viewModel.currPage.startsWith('/create') ? 'active' : undefined)}>Create Meme</a>
                        <div class="profile">
                            <span>Welcome, ${viewModel.username}</span>
                            <a href="/userRecords" class=${ifDefined(viewModel.currPage.startsWith('/userRecords') ? 'active' : undefined)}>My Profile</a>
                            <a href="javascript:void(0)" @click=${viewModel.logout}>Logout</a>
                        </div>
                    </div>
                `
                :
                html`
                    <div class="guest">
                        <div class="profile">
                            <a href="/login" class=${ifDefined(viewModel.currPage.startsWith('/login') ? 'active' : undefined)}>Login</a>
                            <a href="/register" class=${ifDefined(viewModel.currPage.startsWith('/register') ? 'active' : undefined)}>Register</a>
                        </div>
                        <a class=${ifDefined(viewModel.currPage.startsWith('/home') ? 'active' : undefined)} href="/home">Home Page</a>
                    </div>
                `
        }

    `;
};


export default {
    navTemplate
};

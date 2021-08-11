import {html, nothing} from '../../../node_modules/lit-html/lit-html.js';

const login = (viewModel, error=undefined) => {
    return html`
        <section id="login">
            <article class="narrow">
                <header class="pad-med">
                    <h1>Login</h1>
                </header>
                <form id="login-form" class="main-form pad-large" @submit=${viewModel.logg}>
                    ${error !==undefined  ? html`
                        <div class="error">${error}</div>` : nothing}
                    <label>E-mail: <input type="text" name="email"></label>
                    <label>Password: <input type="password" name="password"></label>
                    <input class="action cta" type="submit" value="Sign In">
                </form>
                <footer class="pad-small">Don't have an account? <a href="/register" class="invert">Sign up here</a>
                </footer>
            </article>
        </section>`;
};

export default {
    login
};
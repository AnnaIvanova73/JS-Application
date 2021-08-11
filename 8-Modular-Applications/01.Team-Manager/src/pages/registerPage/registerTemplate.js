import {html, nothing} from '../../../node_modules/lit-html/lit-html.js';


const register = (viewModel,error=undefined) => {
    return html `
        <section id="register">
            <article class="narrow">
                <header class="pad-med">
                    <h1>Register</h1>
                </header>
                <form id="register-form" class="main-form pad-large" @submit=${viewModel.reg}>
                    ${error !== undefined ? html`
                        <div class="error">${error}</div>` : nothing}
                    <label>E-mail: <input type="text" name="email"></label>
                    <label>Username: <input type="text" name="username"></label>
                    <label>Password: <input type="password" name="password"></label>
                    <label>Repeat: <input type="password" name="repass"></label>
                    <input class="action cta" type="submit" value="Create Account">
                </form>
                <footer class="pad-small">Already have an account? <a href="/login" class="invert">Sign in here</a>
                </footer>
            </article>
        </section>
    `
};

export default{
    register
}
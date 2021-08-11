import { html} from '../../../node_modules/lit-html/lit-html.js';

const register = (viewModel) => {
    return html `
        <h1>Register</h1>
        <p class="form-info">Already registered?
            <a href=/login>Login now</a> and have some fun!
        </p>

        <form action="" @submit=${viewModel.reg}>
            <div>
                <input type="email" name="email" placeholder="Email...">
            </div>
            <div>
                <input type="password" name="password" placeholder="Password">
            </div>
            <div>
                <input type="password" name="repeatPass" placeholder="Re-password">
            </div>
            <div>
                <p class="message"></p>
                <button>Register</button>
            </div>
        </form>
        <footer>
            <p><a href="https://softuni.bg">Software University</a> - JS Applications @ 2020</p>
        </footer>
    `;
};

export default{
    register
}
import { html} from '../../../node_modules/lit-html/lit-html.js'

const login = (viewModel) => {
    return html `
        <h1>Login</h1>
        <p class="form-info">Don't have account?
            <a href="/register">Register now</a> and fix that!
        </p>
        <form action="" @submit=${viewModel.logg}>
            <div>
                <input type="email" name="email" placeholder="Email...">
            </div>

            <div>
                <input type="password" name="password" placeholder="Password...">
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
        <footer>
            <p><a href="https://softuni.bg">Software University</a> - JS Applications @ 2020</p>
        </footer>
    `;
};

export default{
    login
}

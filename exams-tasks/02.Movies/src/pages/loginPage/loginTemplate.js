import {html} from '../../../node_modules/lit-html/lit-html.js';

const login = (viewModel) => {
    return html `
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Login User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form class="text-center border border-light p-5" @submit=${viewModel.logg}>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" placeholder="Email" name="email" value="">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" placeholder="Password" name="password" value="">
            </div>

            <button type="submit" class="btn btn-primary">Login</button>
        </form>
      `;
};

export default{
    login
}
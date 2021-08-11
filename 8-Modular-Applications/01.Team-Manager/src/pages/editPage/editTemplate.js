import {html, nothing} from '../../../node_modules/lit-html/lit-html.js';


const edit = (viewModel,error=undefined) => {
    return html`
        <section id="edit">
            <article class="narrow">
                <header class="pad-med">
                    <h1>Edit Team</h1>
                </header>
                <form id="edit-form" class="main-form pad-large" @submit=${(e)=> {viewModel.createRecord(e,viewModel.idRecord)}}>
                    ${error !==undefined  ? html`
                        <div class="error">${error}</div>` : nothing}
                    <label>Team name: <input type="text" name="name" .value=${viewModel.name}></label>
                    <label>Logo URL: <input type="text" name="logoUrl" .value=${viewModel.logoUrl}></label>
                    <label>Description: <textarea name="description">${viewModel.description}</textarea></label>
                    <input class="action cta" type="submit" value="Save Changes">
                </form>
            </article>
        </section>
    `
};

export default {
    edit
};
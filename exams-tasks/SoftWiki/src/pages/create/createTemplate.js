import { html} from '../../../node_modules/lit-html/lit-html.js'


const createTemplate = (viewModel) => {
    return html `
        <div class="container">
            <form action="#" method="" @submit=${viewModel.create}>
                <fieldset>
                    <legend>Create article</legend>
                    <p class="field title">
                        <input type="text" id="title" name="title" placeholder="Arrays">
                        <label for="title">Title:</label>
                    </p>

                    <p class="field category">
                        <input type="text" id="category" name="category" placeholder="Java">
                        <label for="category">Category:</label>
                    </p>
                    <p class="field content">
                        <textarea name="content" id="content"></textarea>
                        <label for="content">Content:</label>
                    </p>

                    <p class="field submit">
                        <button class="btn submit" type="submit">Create</button>
                    </p>

                </fieldset>
            </form>
        </div>
    `;
};

export default{
    createTemplate
}
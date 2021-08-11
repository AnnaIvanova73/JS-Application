import { html,nothing} from '../../../node_modules/lit-html/lit-html.js'

const creatorBtn = (viewModel) => {
    return html`
        <a class="button warning" href="/edit/${viewModel.idRecord}">Edit</a>
        <button class="button danger" @click = ${() => viewModel.delRecord(viewModel.idRecord)}>Delete</button>
    `;
};
const getTemplate = (viewModel) => {
    return html `
        <section id="meme-details">
            <h1>Meme Title: ${viewModel.title}</h1>
            <div class="meme-details">
                <div class="meme-img">
                    <img alt="meme-alt" src= ${viewModel.imageUrl}>
                </div>
                <div class="meme-description">
                    <h2>Meme Description</h2>
                    <p>
                        ${viewModel.description}
                    </p>
                    ${viewModel.isOwner ? creatorBtn(viewModel) : nothing}
                </div>
            </div>
        </section>
    `;
};

export default{
    getTemplate
}
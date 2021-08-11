import {html,nothing} from '../../node_modules/lit-html/lit-html.js';

const noMemes = () => html`<p class="no-memes">No memes in database.</p>`;
const createMeme = (e) => {
    return html`
        <div class="meme">
            <div class="card">
                <div class="info">
                    <p class="meme-title">${e.title}</p>
                    <img class="meme-image" alt="meme-img" src=${e.imageUrl}>
                </div>
                <div id="data-buttons">
                    <a class="button" href=/details/${e._id}>Details</a>
                </div>
            </div>
        </div>
    `;
}
const allRecords = (viewModel) => {
    return Object.keys(viewModel).length === 0 ? html`${noMemes()}`
        :
        html`
            <section id="meme-feed">
                <h1>All Memes</h1>
                <div id="memes">
                   ${viewModel.map(meme => createMeme(meme))}
                   
                </div>
            </section>
        `;
};

export default {
    allRecords
};

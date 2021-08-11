import {html} from '../../node_modules/lit-html/lit-html.js';


const noMemes = () => html`<p class="no-memes">No memes in database.</p>`;

const createSingleRecord = (e) => {
    return html`
        <div class="user-meme">
            <p class="user-meme-title">${e.title}</p>
            <img class="userProfileImage" alt="meme-img" src=${e.imageUrl}>
            <a class="button"  href=/details/${e._id}>Details</a>
        </div>
    `;
};
const getHtml = (viewModel) => {
    return viewModel.count === 0 ? noMemes()
        :  viewModel.data.map(meme=> createSingleRecord(meme))
};

const userRecords = (viewModel) => {
    return html`
            <section id="user-profile-page" class="user-profile">
                <article class="user-info">
                    <img id="user-avatar-url" alt="user-profile" src="/images/female.png">
                    <div class="user-content">
                        <p>Username: ${viewModel.username}</p>
                        <p>Email: ${viewModel.email}</p>
                        <p>My memes count: ${viewModel.count}</p>
                    </div>
                </article>
                <h1 id="user-listings-title">User Memes</h1>
                <div class="user-meme-listings">
                    ${getHtml(viewModel)}
                </div>
            </section>
        `;
};
//${ifDefined(viewModel.currPage.startsWith('/my-profile') ? 'active' : undefined)
export default {
    userRecords
};

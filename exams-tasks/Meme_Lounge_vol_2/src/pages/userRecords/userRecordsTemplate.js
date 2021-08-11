import {html} from '../../../node_modules/lit-html/lit-html.js';
import templates from '../../templates/singleRecordTemplate.js';


const getHtml = (viewModel) => {
    return viewModel.countRecords === 0 ? templates.noRecords(`No memes in database.`)
        :  viewModel.data.map(record=> templates.createSingleRecord(record,true))
};

const userRecords = (viewModel) => {
    return html`
            <section id="user-profile-page" class="user-profile">
                <article class="user-info">
                    <img id="user-avatar-url" alt="user-profile" src="../../../images/female.png">
                    <div class="user-content">
                        <p>Username: ${viewModel.username}</p>
                        <p>Email: ${viewModel.email}</p>
                        <p>My memes count: ${viewModel.countRecords}</p>
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

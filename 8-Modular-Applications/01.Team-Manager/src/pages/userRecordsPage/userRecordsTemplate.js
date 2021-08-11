import {html, nothing} from '../../../node_modules/lit-html/lit-html.js';
import {createSingleRecord} from '../../templates/universalTeamTemplate.js';

const noRecords = () => html`
    <article class="layout narrow">
        <div class="pad-med">
            <p>You are not a member of any team yet.</p>
            <p><a href="/allRecords">Browse all teams</a> to join one, or use the button bellow to cerate your own
                team.</p>
        </div>
        <div class=""><a href="/create" class="action cta">Create Team</a></div>
    </article>
`;

const getHtml = (viewModel) => {
    return viewModel.count === 0 ? noRecords()
        : viewModel.data.map(record => createSingleRecord(record.team));
};

const userRecords = (viewModel) => {
    return html`
        <section id="my-teams">
            <article class="pad-med">
                <h1>My Teams</h1>
            </article>
            ${getHtml(viewModel)}

        </section>
    `;
};
//${ifDefined(viewModel.currPage.startsWith('/my-profile') ? 'active' : undefined)
export default {
    userRecords
};

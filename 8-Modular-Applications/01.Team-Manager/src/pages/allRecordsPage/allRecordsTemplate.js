import {html, nothing} from '../../../node_modules/lit-html/lit-html.js';
import {createSingleRecord} from '../../templates/universalTeamTemplate.js'


const allRecords = (viewModel) => {
    return html`
        <section id="browse">
            <article class="pad-med">
                <h1>Team Browser</h1>
            </article>
            ${viewModel.isLoggedIn 
                    ?
                   html`<article class="layout narrow">
                           <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
                       </article>`
                    :
                    nothing}
            ${Object.keys(viewModel).length === 0 ? nothing :viewModel.data.map(record => createSingleRecord(record))}
        </section>
    `;

};

export default {
    allRecords
};

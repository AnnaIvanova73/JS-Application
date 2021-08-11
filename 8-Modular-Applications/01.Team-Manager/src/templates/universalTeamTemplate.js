import { html} from '../../node_modules/lit-html/lit-html.js';

export const createSingleRecord = (e) => {
    return html`
        <article class="layout">
            <img src=${e.logoUrl} class="team-logo left-col">
            <div class="tm-preview">
                <h2>${e.name}</h2>
                <p>${e.description}</p>
                <span class="details">${e.count}</span>
                <div><a href="/details/${e._id}" class="action">See details</a></div>
            </div>
        </article>
    `;
};
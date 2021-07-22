import {html,render} from "../node_modules/lit-html/lit-html.js";
import {ifDefined} from "../node_modules/lit-html/directives/if-defined.js";

const renderTowns = (towns) => {
    return html` <ul>
        ${towns.map(e => html`${createLi(e)}`)}
    </ul>`
};
const createLi = (e) => {
    return html `
        <li class=${ifDefined(e.class)}>${e.name}</li>
    `
};
const matchesText = (text) => {
    return html `<p>${text}</p>`
}
export default {
    renderTowns,render,matchesText
}
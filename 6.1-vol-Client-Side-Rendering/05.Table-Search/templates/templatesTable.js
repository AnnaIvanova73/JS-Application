import {html, render} from '../node_modules/lit-html/lit-html.js';
import {ifDefined} from "../node_modules/lit-html/directives/if-defined.js";


const createElements = (elements) => html`
    ${elements.map(e => html`
        <tr class=${ifDefined(e.class)}>${createTd(e)}</tr>`)}`;

const createTd = (el) => html`
    <td>${el.name}</td>
    <td>${el.email}</td>
    <td>${el.course}</td>`;

export default {
    createElements,render
};
import {html,render} from '../node_modules/lit-html/lit-html.js';

const createElements = (elements) => html`${elements.map(e => html`${createSingleElement(e)}`)}`;

const createSingleElement = (el) => html`
    <option value=${el._id}>${el.text}</option>`;

let currTemplates = {
    createElements,render
};
export default currTemplates;
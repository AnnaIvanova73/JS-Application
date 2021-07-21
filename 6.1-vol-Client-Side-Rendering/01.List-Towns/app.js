import {html, render} from "./node_modules/lit-html/lit-html.js"


const ulTemplate = (data) => {
    return html`
        <ul>
            ${data.map(e => html`${liElements(e)}`)}
        </ul>
    `
};
const liElements = (el) => {
    return html`<li>${el}</li>`
};

const loadListTowns = (e) => {
    e.preventDefault();
    let input = document.querySelector('#towns').value.split(', ');
    render(ulTemplate(input), document.querySelector('#root'));
    document.querySelector('#towns').value ='';
};

document.querySelector('#btnLoadTowns').addEventListener('click', loadListTowns);


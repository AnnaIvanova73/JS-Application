import {html, render} from "./node_modules/lit-html/lit-html.js"

const ulLisElement = html`
    <ul></ul>`
render(ulLisElement, document.querySelector('#root'));

const createLis = (towns) => html`
    <ul>
        ${towns.map((town) => html`
            <li>${town}</li>`)}
    </ul>`;

document.querySelector('#btnLoadTowns').addEventListener('click', e => {
    e.preventDefault()
    let input = document.querySelector('#towns');
    let towns = input.value.split(', ').map(e => e.trim());
    render(createLis(towns), document.querySelector('#root'));
    input.value = '';

});


import {html, render} from "./node_modules/lit-html/lit-html.js"

const itemTemplates =[];

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
    render(createLis(), document.querySelector('#root'));
    input.value = '';
});

/*
Vol.1
import {html, render} from "./node_modules/lit-html/lit-html.js"
import {repeat} from './node_modules/lit-html/directives/repeat.js'

const ulLisElement = html`
    <ul id="list"></ul>`
render(ulLisElement, document.querySelector('#root'));

const createLis = (towns) => html`${repeat(towns, (e) => html`
    <li>${e}</li>`)}`;

document.querySelector('#btnLoadTowns').addEventListener('click', e => {
    e.preventDefault()
    let input = document.querySelector('#towns');
    let towns = input.value.split(', ').map(e => e.trim());
    let er = document.querySelector('#list')
    let test = createLis(towns).
    er.appendChild(test)
    //render(, );
    input.value = '';
});


Vol.2
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
    render(createLis(), document.querySelector('#root'));
    input.value = '';
});
 */


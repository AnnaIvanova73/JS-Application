import {html, render} from './node_modules/lit-html/lit-html.js';

const createElements = (elements) => html`
    ${elements.map(e => html`
        <tr>${createTd(e)}</tr>`)}`;

const createTd = (el) => html`
    <td>${el.firstName} ${el.lastName}</td>
    <td>${el.email}</td>
    <td>${el.course}</td>`


const generateElements = () => {
    fetch(`http://localhost:3030/jsonstore/advanced/table`)
        .then(response => response.json())
        .then(data => {
            render(createElements(Object.values(data)), document.querySelector('tbody'));
        });
};
const isIncluded = (arr, input) => {
    return arr.map(child => child.textContent.toLowerCase())
        .some(e => e.includes(input.toLowerCase()));
};

const solve = () => {
    generateElements();

    document.querySelector('#searchField').addEventListener('click', (e) => {
        Array.from(document.querySelectorAll('tbody tr.select')).forEach(e => {
            e.classList.remove('select');
        });
    });

    const onClick = () => {
        let input = document.querySelector('#searchField');
        if (!input.value.trim()) {
            return;
        }
        Array.from(document.querySelectorAll('tbody tr'))
            .forEach(e => {
                if (isIncluded(Array.from(e.children), input.value)) {
                    e.classList.add('select');
                }
            });

        input.value = '';
    };

    document.querySelector('#searchBtn').addEventListener('click', onClick);

};

solve();
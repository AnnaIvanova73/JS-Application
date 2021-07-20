import {html, render,reparentNodes} from './node_modules/lit-html/lit-html.js'

const createElements = (elements) => html`${elements.map(e => html`${createSingleElement(e)}`)}`;

const createSingleElement = (el) => html`
    <option value=${el._id}>${el.text}</option>`

const throwIfImputeEmpty = (el) => {
    if (!el.trim()) {
        throw new Error('Field empty! Populate field')
    }
};

const generateElements = () => {
    fetch(`http://localhost:3030/jsonstore/advanced/dropdown`)
        .then(response => response.json())
        .then(data => {
            let currData = Object.values(data);
            render(createElements(currData), document.querySelector('#menu'));
        });
};

const addNewItem = (e) => {

    e.preventDefault();

    let form = e.currentTarget;
    let formData = new FormData(form);

    try {
        let input = formData.get('itemText');
        throwIfImputeEmpty(input);

        fetch(`http://localhost:3030/jsonstore/advanced/dropdown`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({text: input})
        })
            .then(response => response.json())
        .then(data => {
            const fragment = document.createDocumentFragment();
            render(createSingleElement(data), fragment);
            document.querySelector('#menu').appendChild(fragment);
        });
    } catch (err) {
        alert(err);
    } finally {
        form.reset();
    }
};

const startApp = () => {
    generateElements();
    let form = document.querySelector('form');
    form.addEventListener('submit', addNewItem);
};

startApp();

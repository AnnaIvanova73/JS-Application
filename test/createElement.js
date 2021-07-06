function createElement(type, text, attributes = []) {
    let element = document.createElement(type);
    if (text) {
        element.textContent = text;
    }
    attributes.map(attr => attr.split('=')).forEach(([name, value]) => {element.setAttribute(name, value);})
    return element;
}
const appendChildren = (pr, children) => children.forEach(child => pr.appendChild(child));

//Sorting
Array.from(ul.children).sort((a, b) =>  a.title.localeCompare(b.title)).forEach(x => ul.appendChild(x));

const sortListElement = (ulElement) => Array.from(ulElement.children)
    .sort((a, b) => a.textContent.localeCompare(b.textContent)).forEach(x => ulElement.appendChild(x));

function sort(ul) {
    let sorting = Array.from(ul.children);
    sorting = sorting.sort((a, b) =>
        a.childNodes[0].textContent.localeCompare(b.childNodes[0].textContent));
    sorting.forEach(x => ul.appendChild(x))
    return ul;
}
//Validate fields
const isInvalid = (pr1, pr2, pr3) => !pr1 || !pr2 || !pr3;
const IS_INVALID = (pr1, pr2, pr3, pr4) => !pr1 || !pr2 || !pr3 || !pr4;
//Clean input fields argument is array
const cleanInputFields = (arr) => arr.forEach(e => e.value = '');


function appendChildren(parent, children) {
    children.forEach(child => parent.appendChild(child));
}
let name = document.querySelector('input[name="lecture-name"]').value;

let checkIfItsNumber = (ticketPrice) => {
    ticketPrice = ticketPrice.value.trim()
    let num = Number(ticketPrice);
    return num !== num;
};

let isNotANumber = (p) => {
    let num = Number(p);
    return num !== num;
};

console.log(isNotANumber('a'))  // трябва да се извърши отделна проверка, с трим на инпута в друга функция и тогава с или провери с тази
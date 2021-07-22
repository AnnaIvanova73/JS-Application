import templates from './templates/templatesTable.js';

let objectData = [];

const getData = async () => {
    let response = await fetch(`http://localhost:3030/jsonstore/advanced/table`);
    if (!response.ok) {
        throw new Error(`Status: ${response.status}. Error: ${response.message}`);
    }
    return response.json();

};

(async () => {
    let data = await getData();
    objectData = Object.values(data).map(e => {
        return {
            name: `${e.firstName} ${e.lastName}`,
            email: e.email,
            course: e.course
        };
    });
    templates.render(templates.createElements(objectData), document.querySelector('tbody'));
    document.querySelector('#searchBtn').addEventListener('click', onClick);
})();


const onClick = (e) => {
    e.preventDefault();

    templates.render(templates.createElements(objectData), document.querySelector('tbody'));
    let currInput = document.querySelector('#searchField').value.toLowerCase();
    let currData = objectData.map(s => Object.assign({}, s));

    currData.forEach(e => {
        let flag = Object.values(e).some(e => e.toLowerCase().includes(currInput));
        flag ? e.class = 'select' : '';
    });

    templates.render(templates.createElements(currData), document.querySelector('tbody'));
    document.querySelector('#searchField').value = '';
};

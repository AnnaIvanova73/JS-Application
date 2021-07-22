import jsonRequest from './httpLibrary/jsonRequest.js';
import template from './templates/template.js';
let objectValues = [];

const throwIfImputeEmpty = (el) => {
    if (!el.trim()) {
        throw new Error('Field empty! Populate field');
    }
};
const addOption = async (e) => {
    e.preventDefault();
    let currForm = e.currentTarget;
    let formData = new FormData(currForm);

    try {
        const textInput = formData.get('itemText');
        throwIfImputeEmpty(textInput);
        let data = await jsonRequest.post({text: textInput});
        objectValues.push(data);
        template.render(template.createElements(objectValues), document.querySelector('#menu'));
        if (data) {

        }
    } catch (err) {

    } finally {
        currForm.reset();
    }
};
(async () => {
    let data = await jsonRequest.get();
    objectValues = Object.values(data);
    template.render(template.createElements(Object.values(data)), document.querySelector('#menu'));
    document.querySelector('form').addEventListener('submit', addOption);
})();


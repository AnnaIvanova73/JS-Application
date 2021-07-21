import template from './template/htmlTemplates.js';
import service from './service/bookService.js'


const rootElement = document.querySelector('#app');
const formWrapper = document.querySelector('#forms');
const btnAnchor = document.querySelector('#load');
let booksData = new Map();

export const ifIsInvalidThrow = (arr) => {
    if (arr.some(e => e.trim() === '')) {
        throw new Error('All fields are required!');
    }
};
const editBook = async (e) => {
    console.log(e);
    let id = e.currentTarget.closest('[data-id]');
    let data = await service.getBook(id.dataset.id);
    template.render(template.editForm(editForm.formID, id.dataset.id, prepareSaveEdit, data.title, data.author), formWrapper);
};
const delBook = async (e) => {
    let id = e.currentTarget.closest('[data-id]');
    await service.deleteBook(id.dataset.id);
    booksData.delete(id.dataset.id);
    template.render(template.bodyContent(Array.from(booksData.values()), editBook, delBook),
        document.querySelector('#tableBodyId'));
    template.render(template.createForm(createForm.formId, createBook), formWrapper);
};


const loadAllBooks = async (e) => {
    e.preventDefault();
    let data = await service.getAllBooks();

    Object.entries(data).forEach(([key, value]) => {
        value.id = key;
        booksData.set(key, value);
    });
    template.render(template.bodyContent(Array.from(booksData.values()), editBook, delBook)
        , document.querySelector('#tableBodyId'));
};

let createForm = {
    formId: 'add-form',
};

let editForm = {
    formID: 'edit-form'
};


const createBook = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const author = formData.get('author');
    const title = formData.get('title');
    try {
        ifIsInvalidThrow([author, title]);
        const sendData = {author, title};
        let serverData = await service.createBook(sendData);
        let receivedData = {author: serverData.author, title: serverData.title, id: serverData._id};
        booksData.set(serverData._id, receivedData);
        template.render(template.bodyContent(Array.from(booksData.values()), editBook, delBook),
            document.querySelector('#tableBodyId'));
    } catch (err) {
        alert(err);
    } finally {
        form.reset();
    }
};

const prepareSaveEdit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const id = formData.get('id');
    const author = formData.get('author');
    const title = formData.get('title');
    try {
        ifIsInvalidThrow([author, title]);
        const data = {author, title, id};
        await service.editBook(id, data);
        booksData.set(id, data);
        template.render(template.bodyContent(Array.from(booksData.values()), editBook, delBook),
            document.querySelector('#tableBodyId'));
        template.render(template.createForm(createForm.formId, createBook), formWrapper);
    } catch (err) {
        alert(err);
    } finally {
        form.reset();
    }
};

(async () => {
    template.render(template.loadButton(loadAllBooks), btnAnchor);
    template.render(template.tableBooks(), rootElement);
    template.render(template.createForm(createForm.formId, createBook), formWrapper);

})();


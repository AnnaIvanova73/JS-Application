import {html, render} from './node_modules/lit-html/lit-html.js';
const url = `http://localhost:3030/jsonstore/collections/books`;

const postDataRequest = async (m,data,u = url ) => {
   await fetch(u, {
        method: m,
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(data),
    });

};
const deleteDataRequest = async (id) => {
    await fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: {'Content-type': 'application/json'},
    });
};
const deleteBook = async(e) => {
    await deleteDataRequest(e.target.parentNode.id);
    renderAllBooks(false, true);
};
const postData = async (e) => {
    e.preventDefault();
    let id = localStorage.getItem('editBookId');
    let form = e.currentTarget;
    let formData = new FormData(form);
    await postDataRequest('PUT',{author: formData.get('author'), title: formData.get('title')}, `${url}/${id}`);
    localStorage.clear();
    form.reset();
    renderAllBooks(false, true);
};
const createData = async (e) => {
    e.preventDefault();
    let form = e.currentTarget;
    let formData = new FormData(form);
    await postDataRequest('POST',{author: formData.get('author'), title: formData.get('title')});
    renderAllBooks(false, true);
    form.reset();
};
const createElements = (elements) => html`
    ${elements.map(e => html`
        <tr>${createTd(e)}</tr>`)}`;

const createTd = (el) => html`
    <td>${el.author} ${el.lastName}</td>
    <td>${el.title}</td>
    <td id=${el.id}>
        <button @click=${editBook}>Edit</button>
        <button @click=${deleteBook}>Delete</button>
    </td>`



const loadAllBooks = () => {
    fetch(url).then(response => response.json()).then(data => {
        Object.entries(data).map(([key, value]) => value.id = key);
        render(createElements(Object.values(data)), document.querySelector('tbody'));
    })
};
const getCertainBook = async (id) => {
    console.log(`${url}/${id}`);
    console.log(`d953e5fb-a585-4d6b-92d3-ee90697398a1`)
    let response = await fetch(`${url}/${id}`);

    if (response.ok) {
        return await response.json();
    } else {
        alert(`Could not fetch ${response.statusText} ${response.message}`)
    }
};
const loadBtn = html`
    <button id="loadBooks" @click=${loadAllBooks}>LOAD ALL BOOKS</button>`;
const createForm = html`
    <form id="add-form" @submit=${createData}>
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Submit">
    </form>
`
const editForm = html`
    <form id="edit-form" @submit=${postData}>
        <input type="hidden" name="id">
        <h3>Edit book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Save">
    </form>
`;
const createElementsInBody = (flag, flag2) => {
    return html`
        ${loadBtn}
        <table>
            <thead>
            <tr>
                <th>Author</th>
                <th>Title</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>${flag2 ? loadAllBooks() : ''}</tbody>
        </table>
        ${flag ? editForm : createForm}
    `
}
const editBook = async (e) => {
    e.preventDefault();
    let data = await getCertainBook(e.target.parentNode.id);
    localStorage.setItem('editBookId', e.target.parentNode.id)
    let table = createElementsInBody(true);
    render(table, document.body);
    document.querySelector('input[name=author]').value = data.author;
    document.querySelector('input[name=title]').value = data.title;
};
const renderAllBooks = (flag = false, flag2 = false) => {
    let body = document.body;
    let table = createElementsInBody(flag, flag2);
    render(table, body);
};
const startApp = () => {
    renderAllBooks();
};

startApp();


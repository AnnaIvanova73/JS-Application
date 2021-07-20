import {html, render} from '../node_modules/lit-html/lit-html.js'
import {guard} from '../node_modules/lit-html/directives/guard.js';


const createForm = (formId, onSubmit) => {
    return html`
        <form id=${formId} @submit=${onSubmit}>
            <h3>Add book</h3>
            <label>TITLE</label>
            <input type="text" name="title" placeholder="Title...">
            <label>AUTHOR</label>
            <input type="text" name="author" placeholder="Author...">
            <input type="submit" value="Submit">
        </form>`;
};

const editForm = (formId, bookId, onSubmit, titleValue, authorValue) => {
    return html`
        <form id=${formId} @submit=${onSubmit}>
            <input type="hidden" name="id" .value=${bookId}>
            <h3>Edit book</h3>
            <label>TITLE</label>
            <input type="text" name="title" placeholder="Title..." value=${titleValue}>
            <label>AUTHOR</label>
            <input type="text" name="author" placeholder="Author..." value=${authorValue}>
            <input type="submit" value="Save">
        </form>`;
};

const bodyElements = (e,onEdit, onDelete) => {
    console.log(e.id)
    console.log('in')
    return html `
    <tr data-id=${e.id}>
        <td>${e.author}</td>
        <td>${e.title}</td>
        <td>
            <button @click= ${onEdit}>Edit</button>
            <button @click= ${onDelete}>Delete</button>
        </td>
    </tr>
        `
};

const bodyContent = (data, onEdit, onDelete) => html`${guard([data], () => data.map(el => bodyElements(el, onEdit,onDelete)))}`

const tableBooks = () => {
    return html`
        <table>
            <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody id="tableBodyId">
            </tbody>
        </table>
    `
};
//${ifDefined(bodyContent())} tableBodyId
// @click=${() => {onClick()}
const loadButton = (onClick) => {
    return html` <button id="loadBooks" @click=${onClick}>LOAD ALL BOOKS</button>`;
};
export default {
    tableBooks,bodyContent,editForm,createForm,render,loadButton,html
}
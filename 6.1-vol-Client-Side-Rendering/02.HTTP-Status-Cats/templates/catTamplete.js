import {html, render} from "../node_modules/lit-html/lit-html.js"

const renderCats = (cats,callback) => {
    return html`<ul>${cats.map(e => html`${createCat(e,callback)}`)}</ul>>`
};
const createCat = (cat,callback) => {
    return html`
        <li>
            <img src=../images/${cat.imageLocation}.jpg width="250" height="250" alt="Card image cap">
            <div class="info">
                <button @click=${callback} class="showBtn">Show status code</button>
                <div class="status" style="display: none" id=${cat.id}>
                    <h4>Status code: ${cat.statusCode}</h4>
                    <p>${cat.statusMessage}</p>
                </div>
            </div>
        </li>
    `
};

export default {
    render,renderCats
}
import {html} from '../../node_modules/lit-html/lit-html.js';


const getHtml = (viewModel) => {
    return viewModel.count === 0 ? noRecords()
        : templateRecords(viewModel);
};

const noRecords = () => html` <p class="no-cars">No results.</p>`;

const templateRecords = (viewModel) => {
    return html`
        <h2>Results:</h2>
        <div class="listings" id="search">
            ${viewModel.data.map(car => createSingleRecord(car))}
        </div>
    `;
};
const createSingleRecord = (e) => {
    return html`
        <div class="listing">
            <div class="preview">
                <img src=${e.imageUrl}>
            </div>
            <h2>${e.brand} ${e.model}</h2>
            <div class="info">
                <div class="data-info">
                    <h3>Year: ${e.year}</h3>
                    <h3>Price: ${e.price} $</h3>
                </div>
                <div class="data-buttons">
                    <a href="/details/${e._id}" class="button-carDetails">Details</a>
                </div>
            </div>
        </div>
    `;
};
const bonus = (func, shouldRender, viewModel, valueInput) => {
    return html`
        <section id="search-cars">
            <h1>Filter by year</h1>

            <div class="container">
                <input @change=${valueInput} id="search-input" type="text" name="search"
                       placeholder="Enter desired production year">
                <button class="button-list" @click=${func}>Search</button>
            </div>
            ${html`${shouldRender ? getHtml(viewModel) : ''}`}
        </section>

    `;
};

export default {
    bonus
};

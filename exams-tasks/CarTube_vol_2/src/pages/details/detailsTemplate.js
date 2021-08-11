import { html,nothing} from '../../../node_modules/lit-html/lit-html.js'

const creatorBtn = (viewModel) => {
    return html`
        <a href="/edit/${viewModel.idRecord}" class="button-list">Edit</a>
        <a class="button-list" href="javascript:void(0)" @click = ${() => viewModel.delRecord(viewModel.idRecord)}>Delete</a>
    `;
};
const getTemplate = (viewModel) => {
    return html `
        <section id="listing-details">
            <h1>Details</h1>
            <div class="details-info">
                <img src=${viewModel.imageUrl}>
                <hr>
                <ul class="listing-props">
                    <li><span>Brand:</span>${viewModel.brand}</li>
                    <li><span>Model:</span>${viewModel.model}</li>
                    <li><span>Year:</span>${viewModel.year}</li>
                    <li><span>Price:</span>${viewModel.price}$</li>
                </ul>

                <p class="description-para">${viewModel.description}</p>

               
                <div class="listings-buttons">
                    ${viewModel.isOwner ? creatorBtn(viewModel) : nothing}
                </div>
            </div>
        </section>
`;
};

export default{
    getTemplate
}
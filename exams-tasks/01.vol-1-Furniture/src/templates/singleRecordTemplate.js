import { html} from '../../node_modules/lit-html/lit-html.js';

export const createSingleRecord = (e) => {
    return html`
        <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                            <img src=${e.img}>
                            <p>${e.description}</p>
                            <footer>
                                <p>Price: <span>${e.price} $</span></p>
                            </footer>
                            <div>
                                <a href=/details/${e._id} class="btn btn-info">Details</a>
                            </div>
                    </div>
                </div>
            </div>
    `
};

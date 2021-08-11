import { html,nothing} from '../../../node_modules/lit-html/lit-html.js'

const usersBtn = (viewModel) => {
    if(viewModel.isLoggedIn){
        return viewModel.hasLiked ? ''
            :
            html`<a class="button" href="javascript:void(0)"  @click=${() => viewModel.likeRecord(viewModel.idRecord)} >Like</a>`;
    }
   return '';
};

const creatorBtn = (viewModel) => {
    return html`
        <a class="button" href="/edit/${viewModel.idRecord}">Edit</a>
        <a class="button" href="javascript:void(0)" @click = ${() => viewModel.delRecord(viewModel.idRecord)}>Delete</a>
    `;
};
const getTemplate = (viewModel) => {
    console.log(viewModel)
    return html `
        <section id="details-page" class="details">
            <div class="book-information">
                <h3>${viewModel.title}</h3>
                <p class="type">Type: ${viewModel.type}</p>
                <p class="img"><img src=${viewModel.imageUrl}></p>
                <div class="actions">
                    ${viewModel.isLoggedIn
                            ?
                            html`${viewModel.isOwner ? creatorBtn(viewModel) : usersBtn(viewModel)}`
                            : 
                            nothing}
                    <div class="likes">
                        <img class="hearts" src="/images/heart.png">
                        <span id="total-likes">Likes: ${viewModel.totalLikes}</span>
                    </div>
                </div>
            </div>
            <div class="book-description">
                <h3>Description:</h3>
                <p>${viewModel.description}</p>
            </div>
        </section>
`;
};

export default{
    getTemplate
}
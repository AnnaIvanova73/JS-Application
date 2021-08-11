import {html, nothing} from '../../../node_modules/lit-html/lit-html.js';

const creatorBtnDelete = (record, viewModel) => {
    const isOwner = viewModel.isOwner;
    const idOwner = viewModel.data._ownerId;
    if (!isOwner) {
        return;
    }
    if (record.user._id === idOwner) {
        return;
    }
    return html`<a href="javascript:void(0)" @click=${() => viewModel.delMembership(record.user._id)}
                   class="tm-control action">Remove from team</a>`;

};
const creatorButtonsMembership = (idUser,viewModel) => {
    return html`
        <a href="javascript:void(0)" class="tm-control action" @click=${() => viewModel.approveMembership(idUser)}>Approve</a>
        <a href="javascript:void(0)" class="tm-control action" @click=${() => viewModel.declineMembership(idUser)}>Decline</a>
    `;
};

const createSingleRecord = (record, isDeleteRecordElement, viewModel) => {
    return html`
        <li>${record.user.username}
            ${isDeleteRecordElement ? creatorBtnDelete(record, viewModel)
                    : creatorButtonsMembership(record.user._id,viewModel)
            }
        <li>`;
};
const getRecords = (records, isDeleteRecordElement, viewModel) =>
    records.map(member => createSingleRecord(member, isDeleteRecordElement, viewModel));

const getTemplate = (viewModel) => {
   // console.log(viewModel.isSimpleUser);
    return html`
        <section id="team-home">
            <article class="layout">
                <img src=${viewModel.data.logoUrl} class="team-logo left-col">
                <div class="tm-preview">
                    <h2>${viewModel.data.name}</h2>
                    <p>${viewModel.data.description}</p>
                    <span class="details">${viewModel.currMembers.length} Members</span>

                    <div>
                        ${viewModel.isOwner ? html`<a href="/edit/${viewModel.data._id}" class="action">Edit
                            team</a> ` : nothing}
                        ${viewModel.isSimpleUser ? html`<a href="javascript:void(0)" class="action"
                                                           @click=${viewModel.requestMembership}>Join
                            team</a>` : nothing}
                        ${viewModel.isAMember && !(viewModel.isOwner) ? html`<a href="javascript:void(0)" class="action invert"  @click=${viewModel.leaveRequest}>Leave
                            team</a>` : nothing}
                        ${viewModel.isPending && !(viewModel.isOwner) ? html` Membership pending.
                        <a href="javascript:void(0)" @click=${viewModel.cancelRequest}>
                            Cancel request</a>` : nothing}
                    </div>
                  
                </div>
                <div class="pad-large">
                    <h3>Members</h3>
                    <ul class="tm-members">
                        ${viewModel.currMembers.length > 0 ?
                                html`${getRecords(viewModel.currMembers, true,viewModel)}`
                                : nothing}

                    </ul>
                </div>

                ${viewModel.isOwner ? html`
                    <div class="pad-large">
                        <h3>Membership Requests</h3>
                        <ul class="tm-members">
                            ${viewModel.pendingMembers.length > 0 ?
                                    html`${getRecords(viewModel.pendingMembers, false,viewModel)}`
                                    : nothing}
                        </ul>
                    </div>
                ` : nothing}

            </article>
        </section>
    `;
};

export default {
    getTemplate
};
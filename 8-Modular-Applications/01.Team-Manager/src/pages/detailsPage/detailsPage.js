import detailsTemplate from './detailsTemplate.js';


let currRouter = undefined;
let currRender = undefined;
let authService = undefined;
let subjectService = undefined;
let membershipService = undefined;
let viewModel;
let pendingMembers;
let currMembers;
const init = (router, render, service1, service2, service3) => {
    currRouter = router;
    currRender = render;
    authService = service1;
    subjectService = service2;
    membershipService = service3;
    viewModel = {};
    pendingMembers = [];
    currMembers = [];
};

const getView = async (context) => {
    const idRecord = context.params.id;
    try {

        let [dataTeam, dataMembers] = await Promise.all([
            subjectService.getRecord(idRecord),
            subjectService.getListOfAllMembers(idRecord)
        ]);

        currMembers = dataMembers.filter(e => e.status === 'member');
        pendingMembers = dataMembers.filter(e => e.status === 'pending');

        let isAMember = dataMembers.some(e => (e.user._id === authService.getUserId() && e.status === 'member'));
        let isPending = dataMembers.some(e => (e.user._id === authService.getUserId() && e.status === 'pending'));

        const isOwner = Boolean(dataTeam._ownerId === authService.getUserId());
        const isGuest = authService.isLoggedIn();
        const isSimpleUser = _isLoggedInUser(isAMember, isPending, isOwner, isGuest);

        viewModel = {
            data: dataTeam,
            isAMember, isPending, isOwner, isGuest,isSimpleUser,
            pendingMembers, currMembers,
            requestMembership, cancelRequest, approveMembership, declineMembership, delMembership,leaveRequest
        };


    } catch ( err ) {
        console.log(err);
    }
    let currTemplate = detailsTemplate.getTemplate(viewModel);
    currRender(currTemplate);
};

export default {
    init,
    getView
};

const _isLoggedInUser = (isAMember, isPending, isOwner, isGuest,) => {

    if (isAMember || isPending || isOwner) {
        return false;
    }
    return isGuest;
};

const requestMembership = async () => {
    let teamId = viewModel.data._id;
    await membershipService.requestMembership({teamId,user:{email:authService.getEmail(),username:authService.getUserName(),_id:authService.getUserId()}});
    currRouter.redirect(`/details/${teamId}`);
};

const delMembership = async (currUserId) => {
    if (currMembers.length <= 0) {
        return;
    }
    let currUser = currMembers.filter(e => e._ownerId === currUserId)[0];
    await membershipService.removeMembersRequest(currUser._id);
    currRouter.redirect(`/details/${currUser.teamId}`);
};

const cancelRequest = async () => {
    if (pendingMembers.length <= 0) {
        return;
    }
    let currUser = pendingMembers.filter(e => e._ownerId === authService.getUserId())[0];
    await membershipService.removeMembersRequest(currUser._id);
    currRouter.redirect(`/details/${currUser.teamId}`);
};
const leaveRequest = async () => {
    if (currMembers.length <= 0) {
        return;
    }
    let currUser = currMembers.filter(e => e._ownerId === authService.getUserId())[0];
    await membershipService.removeMembersRequest(currUser._id);
    currRouter.redirect(`/details/${currUser.teamId}`);
};


const declineMembership = async (currUserId) => {
    if (pendingMembers.length <= 0) {
        return;
    }
    let currUser = pendingMembers.filter(e => e._ownerId === currUserId)[0];
    await membershipService.removeMembersRequest(currUser._id);
    currRouter.redirect(`/details/${currUser.teamId}`);
};

const approveMembership = async (currUserId) => {
    if (pendingMembers.length <= 0) {
        return;
    }
    let currUser = pendingMembers.filter(e => e._ownerId === currUserId)[0];
    await membershipService.approveMembership(currUser._id, {status: "member"});
    currRouter.redirect(`/details/${currUser.teamId}`);
};

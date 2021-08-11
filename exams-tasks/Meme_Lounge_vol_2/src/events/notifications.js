import notificationsTemplate from '../templates/notificationsTemplate.js';

let currRender = undefined;

const init = (render) => currRender = render;

const getView = async (msg) => {
    const currentView = notificationsTemplate.notifications(msg);
    currRender(currentView);

    setTimeout(() => {
        const currentView = notificationsTemplate.getNothing();
        currRender(currentView);
    }, 3000);
};

export default {
    init, getView
};
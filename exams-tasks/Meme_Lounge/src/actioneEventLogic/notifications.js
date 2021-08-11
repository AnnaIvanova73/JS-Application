import notificationsTemplate from '../templates/notificationsTemplate.js';


let currRender = undefined;
let containerNotifications = undefined;

const init = (renderer, wrapper) => {
    currRender = renderer;
    containerNotifications = wrapper;
};


const displayNotification = async (msg) => {
    currRender(notificationsTemplate.notifications(msg));
    containerNotifications.querySelector('.notification').style.display = "block";

    setTimeout(() => { containerNotifications.querySelector('.notification').style.display = "none"; }, 3000);
};

export default {
    displayNotification, init
};
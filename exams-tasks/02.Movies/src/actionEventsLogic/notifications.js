import notificationsTemplate from '../templates/notificationsTemplate.js';

let rendSucc = undefined;
let rendErr = undefined;
let ctnSucc = undefined;
let ctnErr = undefined;

const init = (rendererSuccess, rendererError, wrapperSucc, wrapperErr) => {
    rendSucc = rendererSuccess;
    rendErr = rendererError;
    ctnSucc = wrapperSucc;
    ctnErr = wrapperErr;
};


const getView = async (msg, isPositive) => {
    if(isPositive){
        rendSucc(notificationsTemplate.notifications(msg, isPositive));
        ctnSucc.style.display = "block";
        setTimeout(() => {
            ctnSucc.style.display = "none";
        }, 1000);
    }else{
        rendErr(notificationsTemplate.notifications(msg, isPositive));
        ctnErr.style.display = "block";
        setTimeout(() => {
            ctnErr.style.display = "none";
        }, 1000);
    }


};

export default {
    getView, init
};
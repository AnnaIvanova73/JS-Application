import {guestHomeTemplate} from '../templates/guestHomeTemplate.js';
import authService from "../services/authService.js";

let currRouter = undefined;
let currRender = undefined;

const init = (router, render) => {
    currRouter = router;
    currRender = render;
};

const getView = async () => {
    if(authService.isLoggedIn()){
        currRouter.redirect('/meme-feed');
    }else{
        let viewTemp = guestHomeTemplate();
        currRender(viewTemp);
    }

};

export default {
    init,
    getView
};
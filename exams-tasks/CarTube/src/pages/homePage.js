import homeTemplate from '../templates/homeTemplate.js';
import authService from "../services/authService.js";

let currRouter = undefined;
let currRender = undefined;

const init = (router, render) => {
    currRouter = router;
    currRender = render;
};

const getView = async () => {
    let viewTemp = homeTemplate.home();
    currRender(viewTemp);
};

export default {
    init,
    getView
};
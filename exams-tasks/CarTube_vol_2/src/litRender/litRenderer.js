import {render} from '../../node_modules/lit-html/lit-html.js';
export default class Lit {
    constructor() {

    };
    renderHandler(domElement) {
        return function (template) {
          render( template,domElement);
        };
    };
};

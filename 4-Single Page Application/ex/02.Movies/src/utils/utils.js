import constants from './../constants/constants.js';

const hideAllViewsExceptOne = (param) => {
    let views = constants.getViews();
    Object.keys(views).filter(e => e !== param).forEach(e=> {
        views[e] instanceof Array ? views[e].forEach(e => e.setAttribute('hidden','')):
            views[e].setAttribute('hidden','')
    });

    param === 'homePage' ? constants.getViews().homePage.forEach(e => e.removeAttribute('hidden')) :
        views[param].removeAttribute('hidden','');
};

const goHome = () => {
    console.log('bugibugev')
    constants.getNavItems().navBar.querySelector('a.navbar-brand').addEventListener('click',() =>{
       hideAllViewsExceptOne('homePage');
    });

};
const isInvalid = (arr) => {
    return arr.some(e => e === '');
};

/**
 * type -> POST/PUT,data -> OBJECT
 */
const requestHttpCredentials  = (type,data) => {

    return{
        method: type,
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(data)
    };
}

const createElement = (type, text, attributes = []) => {
    let element = document.createElement(type);
    if (text) {
        element.textContent = text;
    }
    attributes.map(attr => attr.split('=')).forEach(([name, value]) => {
        value ? element.setAttribute(name, value) : element.setAttribute(name,'');
    });
    return element;
};

const appendChildren = (pr, children) => children.forEach(child => pr.appendChild(child));

export default {
    hideAllViewsExceptOne,goHome,isInvalid,requestHttpCredentials,createElement,appendChildren
}
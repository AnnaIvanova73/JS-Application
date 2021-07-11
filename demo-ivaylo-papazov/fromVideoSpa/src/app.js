//import registerPage from './registerPage';

import { isAuthenticated } from './auth.js';
import loginPage from './loginPage.js';
import registerPage from './registerPage.js';
import moviesPage from './moviesPage.js';
import navigation from './navigation.js'
import logout from './logout.js';

let headerElement = document.querySelector('.header .nav');
let pages = {
    register: registerPage,
    login: loginPage,
    movies: moviesPage,
    logout,
}

navigation.updateNavigation();

if (isAuthenticated()) {
    moviesPage.showPage();
    navigation.updateNavigation();
}
headerElement.addEventListener('click', (e) => {
    e.preventDefault();
    navigation.updateNavigation()
    if (e.target.tagName === 'A') {
        //console.log(e.target.href) --> http://localhost:3000/#
        let dataLink = e.target.getAttribute("data-link");//1. взима валюто от html  секцията с навигация например името и е register
        if (Object.keys(pages).includes(dataLink)) {
            hidePages();//2. ако имаме валиден click  и ако
            //2. имаме валиден линк първата ни работа е да извикаме hidePages, който минава и скрива всички секции

            //1.търси в обекта pages има ли такъв ключ с име register
            let currentView = pages[dataLink];// влизаме вътре, открили сме ключа присвояваме го на променливата currentView
            currentView.showPage();// присвоената стойност от обекта, pages която е импортната от модула registerPage  извиква функция,
            //1. която премахва от wrapper на секцията с регистрация класа hidden и секцията се показва
        }
    }

});

function hidePages() {
    Object.values(pages).forEach(e => e.hidePage()); // взимаме от обекта pages, всички валюта,които са импортнатите js файлове/модули
    // от всеки модул викаме функцията, hidePages(), която взима елемента,
    // които сме селектнали и му добавя класът hidden. и съответно го скрива
}




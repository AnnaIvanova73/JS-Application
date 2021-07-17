import createPage from "../pages/createPage.js";
import detailsPage from "../pages/detailsPage.js";
import editPage from "../pages/editPage.js";
import homePage from "../pages/homePage.js";
import loginPage from "../pages/loginPage.js";
import registerPage from "../pages/registerPage.js";
import authService from "../services/authService.js";


let viewMap = {
    'create': async () => await createPage.getPage(),
    'details': async (id) => await detailsPage.getPage(id),
    'edit': async (id) => await editPage.getPage(id),
    'home': async () => await homePage.getPage(),
    'login': async () => await loginPage.getPage(),
    'register': async () => await registerPage.getPage(),
    'logout': async () => await authService.logout(),
    'delete': async (id) => await detailsPage.deleteMovie(id),
    'like': async (id) => await detailsPage.addLike(id),
}

let navLink = undefined;
let callbackFuncFromViewDelegator = undefined; //navigationCallback

const init = (allButtonElements, navSelector, callbackFunc) => {
    allButtonElements.forEach(e => e.addEventListener('click', onClickTriggerAction));
    navLink = navSelector;
    callbackFuncFromViewDelegator = callbackFunc;

};

const onClickTriggerAction = async (e) => {
    let element = e.target.matches(navLink) ? e.target : e.target.closest(navLink);
    let route = element.dataset.route;
    let id = element.dataset.id;
   await  navigateTo(route, id);
};
const navigateTo = async (route, id) => {
    if (viewMap[route]) {
        let viewRespondPromise = viewMap[route](id);
        callbackFuncFromViewDelegator(viewRespondPromise);
    }
};

let viewPort = {
    init, navigateTo, onClickTriggerAction
};

export default viewPort;

/*
/**
 * ПРИ ИНИЦИАЛИЗАЦИЯ
 * 1 param => allButtonElements получаваме всички елементи над които можем да кликнем и сме белязали/class list предварително,
 * и им закачаме eventListener
 * 2 param => получаваме селектора, с които сме ги белязали и го запазваме
 * 3 param => получаваме callback функция от друг модул,
 * която ще покаже намераната страница, която искаме да покажем и ще махне всички останали и я запазваме, присвоявайки я на променлива

const init = (allButtonElements, navSelector, callbackFunc) => {
    navLink = navSelector;
    callbackFuncFromViewDelegator = callbackFunc;
    allButtonElements.forEach(e => e.addEventListener('click', onClickTriggerAction));
};

const onClickTriggerAction = async (e) => {
 */
//при клик
/**
 * The matches() method checks to see if the Element would be selected by the provided selectorString --
 * in other words -- checks if the element "is" the selector.

 let element = e.target.matches(navLink) ? e.target : e.currentTarget.closest(navLink); //търсим съвпадание на елемент, който може да се кликне
 // по неговия клас или какъвто там белег сме му сложили, ако не намерим елемент, които да съдържа класа, търсим най-близкия елемент с този клас
 console.log(element)
 let [route, id] = element.dataset.route.split('/'); // получаваме кликаемия елемент, взимаме от него пропъртито дата, и стойността
 //която сме му задали, за да знаем какво да търсим в мапа
 await navigateTo(route, id); // викаме функцията, която ще намери има ли съвпадение в мапа и ще делегира на предварително запазения callback
 // махането и слагането на елементите
 };
 const navigateTo = async (route, id) => {
    if (viewMap[route]) { //търсим съвпадение в мапа
        let viewRespondPromise = await viewMap[route](id); //ако има съвпадение викаме мап функцията и изчакваме да се изпълни, тъй като вютата достъпва
        //данни от сървъра
        callbackFuncFromViewDelegator(viewRespondPromise);//викаме callback функцията, която си бяхме запазили при инициализация, за да дисплейне страница
        //можем да използваме тази функция самостоятелно
    //}
//};
 */
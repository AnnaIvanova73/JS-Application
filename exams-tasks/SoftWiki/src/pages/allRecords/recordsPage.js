import allRecords from './recordsTemplate.js';
import constants from '../../constants/constants.js';

let viewModelJS = undefined;
let viewModelCSharp = undefined;
let viewModelJava = undefined;
let viewModelPython = undefined;
let currRouter = undefined;
let currRender = undefined;
let subjectService = undefined;
let authService = undefined;
let searchCriteria = undefined;
let sortCriteria = undefined;

const init = (router, render, service1,service2,searchBy,sortBy) => {
    currRouter = router;
    currRender = render;
    authService = service1;
    subjectService = service2;
    searchCriteria = searchBy;
    sortCriteria = sortBy;

    viewModelJS = {data: [], countRecords: 0};
    viewModelCSharp = {data: [], countRecords: 0};
    viewModelJava = {data: [], countRecords: 0};
    viewModelPython = {data: [], countRecords: 0};
};


const getView = async () => {

    let javaData, jsData, sharpData, pythonData;

    try {
        if (authService.isLoggedIn()) {
            [javaData, jsData, sharpData, pythonData] = await Promise.all([
                subjectService.getAllByParamSorted(searchCriteria, constants.serverCategories.java, sortCriteria),
                subjectService.getAllByParamSorted(searchCriteria, constants.serverCategories.js, sortCriteria),
                subjectService.getAllByParamSorted(searchCriteria, constants.serverCategories.csharp, sortCriteria),
                subjectService.getAllByParamSorted(searchCriteria, constants.serverCategories.python, sortCriteria),
            ]);
        } else {
            [javaData, jsData, sharpData, pythonData] = await Promise.all([
                subjectService.getAllByParam(searchCriteria,constants.serverCategories.java),
                subjectService.getAllByParam(searchCriteria, constants.serverCategories.js),
                subjectService.getAllByParam(searchCriteria, constants.serverCategories.csharp),
                subjectService.getAllByParam(searchCriteria, constants.serverCategories.python),
            ]);
        }

        viewModelJava.data = javaData;
        viewModelJS.data = jsData;
        viewModelCSharp.data = sharpData;
        viewModelPython.data = pythonData;

        viewModelJava.countRecords = Object.keys(viewModelJava.data).length;
        viewModelJS.countRecords = Object.keys(viewModelJS.data).length;
        viewModelCSharp.countRecords = Object.keys(viewModelCSharp.data).length;
        viewModelPython.countRecords = Object.keys(viewModelPython.data).length;

    } catch ( err ) {
        console.log('No records, in database');

    } finally {

        let currTemplate = allRecords.allRecords(viewModelJS, viewModelCSharp, viewModelJava, viewModelPython);
        currRender(currTemplate);
    }

};

export default {
    init,
    getView
};

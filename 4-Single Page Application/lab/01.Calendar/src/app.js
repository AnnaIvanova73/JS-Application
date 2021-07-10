import year2020 from './year2020.js'
import year2021 from './year2021.js'
import year2022 from './year2022.js'
import year2023 from './year2023.js'
let saveYear = 0;


Array.from(document.querySelectorAll('section.monthCalendar')).forEach(e => {
    e.classList.add('hidden')
});
Array.from(document.querySelectorAll('section.daysCalendar')).forEach(e => {
    e.classList.add('hidden')
});

const years = {
    2020: year2020,
    2021: year2021,
    2022: year2022,
    2023: year2023,

};
const months = {
    Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sept: 9, Oct: 10, Nov: 11, Dec: 12
};

function dealWithPages(param) {
    console.log(saveYear)
    if(saveYear === 0){
        saveYear = param;
        let func = years[param];
        let currElement = document.querySelector(`.shown`);
        currElement.classList.remove('shown');
        currElement.classList.add('hidden');
        func.showPage();
    }else{
        let month = months[param];
        let currElement = document.querySelector(`.shown`);
        currElement.classList.remove('shown');
        currElement.classList.add('hidden');
        let func = years[saveYear];
        console.log(func)
        let id = `month-${saveYear}-${month}`
        console.log(id)
        func.showMonths(id);
    }

    return "";
}

document.addEventListener('click', e => {


    if (Object.keys(years).includes(e.target.textContent) || e.target.classList.contains('day')) {
        let clickedOn = '';
        if (e.target.classList.contains('day')) {
            clickedOn = e.target.children[0].textContent
        } else {
            clickedOn = e.target.textContent
        }

        console.log(clickedOn)
        if(Object.keys(years).includes(clickedOn) || Object.keys(months).includes(clickedOn) ){
            dealWithPages(clickedOn);
        }else{
            let currElement = document.querySelector(`.shown`);
            currElement.classList.remove('shown');
            currElement.classList.add('hidden');
            document.getElementById(`years`).classList.remove('hidden')
            document.getElementById(`years`).classList.add('shown')
            saveYear = 0;
        }

    }
});





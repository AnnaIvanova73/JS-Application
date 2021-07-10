let year = document.querySelector('#year-2022');

const showPage = () => {
    year.classList.remove('hidden');
    year.classList.add('shown');
}



const showMonths = (id) => {
    document.getElementById(id).classList.remove('hidden');
    document.getElementById(id).classList.add('shown');
}
export default {
    showPage,showMonths
}
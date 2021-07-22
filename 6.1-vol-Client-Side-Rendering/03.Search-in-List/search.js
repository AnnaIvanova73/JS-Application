import towns from './towns.js';
import townTemplate from './templates/townTemplate.js';

townTemplate.render(townTemplate.renderTowns(towns.map(e => ({name: e}))), document.querySelector('#towns'));

const prepareCleanValues = () => {
    document.querySelector('#result').value = '';
    townTemplate.render(townTemplate.renderTowns(towns.map(e => ({name: e}))), document.querySelector('#towns'));
    let currTowns = towns.map(e => ({name: e}));
    return Object.assign([], currTowns);
};

const search = (e) => {
    e.preventDefault();
    let workData = prepareCleanValues();
    let searchedText = document.querySelector('#searchText').value;

    if (searchedText.trim() !== '') {
        workData.map(e => e.name.toLowerCase().includes(searchedText.toLowerCase()) ? e.class = 'active' : e);
        townTemplate.render(townTemplate.renderTowns(workData), document.querySelector('#towns'));
    }
    let matchesCount = workData.filter(e => e.class).length;

    const text = matchesCount === 1 ? `${matchesCount} match found` : `${matchesCount} matches found`;
    townTemplate.render(townTemplate.matchesText(text), document.querySelector('#result'));

    document.querySelector('#searchText').value = '';
};
document.querySelector('button').addEventListener('click', search);
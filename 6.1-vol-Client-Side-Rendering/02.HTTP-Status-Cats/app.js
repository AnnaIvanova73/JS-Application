import catTemplate from './templates/catTamplete.js';
import catSeeder from './catSeeder.js';


const onClick = (e) => {
    e.target.textContent = e.target.textContent = 'Show status code' ? 'Hide status code' : 'Show status code';
    let divStatus = e.target.nextElementSibling;
    divStatus.style.display === 'none' ? divStatus.style.display = 'block' : divStatus.style.display = 'none';
};

const lisCats = document.querySelector('#allCats');
catTemplate.render(catTemplate.renderCats(catSeeder.cats, onClick), lisCats);


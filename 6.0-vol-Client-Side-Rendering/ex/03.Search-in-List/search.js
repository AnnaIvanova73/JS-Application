import towns from './towns.js';
import {html, render} from './node_modules/lit-html/lit-html.js'

const createElements = (elements) => html`
    <ul>
        ${elements.map(e => html`
            <li>${e}</li>`)}
    </ul>
`

function search() {
    render(createElements(towns), document.querySelector('#result'));

    document.querySelector('#searchText').addEventListener('click', (e) => {
        Array.from(document.querySelectorAll('ul li')).forEach(e => e.classList.remove('active'));
        document.querySelector('#result').lastChild.remove();
    });

    document.querySelector('button').addEventListener('click', () => {
        let matches = 0;
        const currCity = document.querySelector('#searchText');
        if(!currCity.value.trim()){
            return;
        }

        Array.from(document.querySelectorAll('ul li')).forEach(e => {
            if (e.textContent.includes(currCity.value)) {
                e.classList.add('active');
                matches++;
            }
        });

       matches ? document.querySelector('#result')
           .appendChild(document.createTextNode(`${matches === 1 ? `1 match found` : `${matches} matches found`}`)) : '';
        currCity.value = '';
    });

}

search();